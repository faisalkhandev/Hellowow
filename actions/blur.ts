// app/actions/blurImage.ts
import { NextResponse } from 'next/server';
import sharp from 'sharp';

export  const blur=async(request: Request)=> {
  const data = await request.formData();
  const file = data.get('file') as File;
  const blurValue = parseInt(data.get('blur') as string, 10);

  if (!file || !blurValue) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  try {
    const blurredImage = await sharp(buffer)
      .blur(blurValue)
      .toFormat('png')
      .toBuffer();

    return new Response(blurredImage, {
      headers: {
        'Content-Type': 'image/png',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Image processing failed' }, { status: 500 });
  }
}
