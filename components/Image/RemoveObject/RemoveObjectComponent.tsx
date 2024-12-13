"use client";

import React, { useRef, useState, useEffect } from 'react';
import { applySegmentationMask } from '@imgly/background-removal';

const ImageEditor: React.FC<{ file: File }> = ({ file }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [image, setImage] = useState<HTMLImageElement | null>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [mask, setMask] = useState<boolean[]>([]); // To store mask pixels
    const [brushSize, setBrushSize] = useState(20); // Initial brush size
    const [brushPosition, setBrushPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

    // Load image onto the canvas when the file prop changes
    useEffect(() => {
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const imgElement = new Image();
                imgElement.src = reader.result as string;
                imgElement.onload = () => {
                    setImage(imgElement);
                    const canvas = canvasRef.current;
                    if (canvas) {
                        const context = canvas.getContext('2d');
                        if (context) {
                            canvas.width = imgElement.width;
                            canvas.height = imgElement.height;
                            context.drawImage(imgElement, 0, 0);
                            setMask(new Array(imgElement.width * imgElement.height).fill(false));
                        }
                    }
                };
            };
            reader.readAsDataURL(file);
        }
    }, [file]);

    const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
        setIsDrawing(true);
        draw(event);
    };

    const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
        if (isDrawing) {
            draw(event);
        }
        const canvas = canvasRef.current;
        if (canvas) {
            const { offsetX, offsetY } = event.nativeEvent;
            setBrushPosition({ x: offsetX, y: offsetY });
            drawBrushPreview();
        }
    };

    const draw = (event: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (canvas) {
            const context = canvas.getContext('2d');
            const { offsetX, offsetY } = event.nativeEvent;

            context!.fillStyle = '#1A8FE3';
            context!.fillRect(offsetX - brushSize / 2, offsetY - brushSize / 2, brushSize, brushSize);

            for (let i = -Math.floor(brushSize / 2); i <= Math.floor(brushSize / 2); i++) {
                for (let j = -Math.floor(brushSize / 2); j <= Math.floor(brushSize / 2); j++) {
                    const x = offsetX + j;
                    const y = offsetY + i;

                    if (x >= 0 && x < canvas.width && y >= 0 && y < canvas.height) {
                        const maskIndex = (y * canvas.width + x);
                        mask[maskIndex] = true;
                    }
                }
            }

            setMask([...mask]);
        }
    };

    const drawBrushPreview = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            const context = canvas.getContext('2d');
            context!.clearRect(0, 0, canvas.width, canvas.height);
            if (image) {
                context!.drawImage(image, 0, 0);
            }
            for (let i = 0; i < mask.length; i++) {
                if (mask[i]) {
                    const x = (i % canvas.width);
                    const y = Math.floor(i / canvas.width);
                    context!.fillStyle = '#90cfff';
                    context!.fillRect(x - brushSize / 2, y - brushSize / 2, brushSize, brushSize);
                }
            }
            context!.fillStyle = '#1A8FE3';
            context!.beginPath();
            context!.arc(brushPosition.x, brushPosition.y, brushSize / 2, 0, Math.PI * 2, true);
            context!.fill();
        }
    }

    const endDrawing = () => {
        setIsDrawing(false);
    };

    const removeObject = async () => {
     
            const canvas = canvasRef.current;
            const blob = new Blob([file], { type: file.type });
          
                
                    if (blob) {
                        // Ensure mask is defined and is a valid structure for applySegmentationMask
                        if (!mask || mask.length === 0) {
                            console.error("Mask is not defined or empty");
                            return;
                        }
console.log(mask,"Masjjsjjs");

                        const result = await applySegmentationMask(URL.createObjectURL(file), mask);

                        // Handle the creation of the new image
                        const finalImage = new Image();
                        const finalImageURL = URL.createObjectURL(result);
                        finalImage.src = finalImageURL;
                        finalImage.onload = () => {
                            const context = canvas!.getContext('2d');
                            context!.clearRect(0, 0, canvas!.width, canvas!.height);
                            context!.drawImage(finalImage, 0, 0);
                        };
                   
                
            }
    
    };

    const handleBrushSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newSize = Number(event.target.value);
        setBrushSize(newSize);
    };

    return (
        <div>
            <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseMove={handleMouseMove}
                onMouseUp={endDrawing}
                onMouseLeave={endDrawing}
                style={{ border: '1px solid black' }}
            />
            <div>
                <label htmlFor="brush-size">Brush Size: {brushSize}px</label>
                <input
                    id="brush-size"
                    type="range"
                    min="1"
                    max="100"
                    value={brushSize}
                    onChange={handleBrushSizeChange}
                />
            </div>
            <button onClick={removeObject}>Remove Object</button>
        </div>
    );
};

export default ImageEditor;