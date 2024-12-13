"use client";

import { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  Search,
  Loader2,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

interface Reciter {
  identifier: string;
  name: string;
  language: string;
  style?: string;
}

interface Translation {
  identifier: string;
  name: string;
  language: string;
  englishName: string;
}

interface Ayah {
    numberInSurah: number;
  audio: string;
  text: string;
  translation: string;
}

const RECITERS: Reciter[] = [
  {
    identifier: "ar.alafasy",
    name: "Mishary Rashid Alafasy",
    language: "Arabic",
  },
  {
    identifier: "ar.abdurrahmaansudais",
    name: "Abdurrahmaan As-Sudais",
    language: "Arabic",
  },
  { identifier: "ar.hudhaify", name: "Ali Al-Hudhaify", language: "Arabic" },
  {
    identifier: "ar.minshawi",
    name: "Mohamed Siddiq El-Minshawi",
    language: "Arabic",
  },
  {
    identifier: "ar.muhammadayyoub",
    name: "Muhammad Ayyoub",
    language: "Arabic",
  },
];

const TRANSLATIONS: Translation[] = [
  {
    identifier: "en.asad",
    name: "Muhammad Asad",
    language: "English",
    englishName: "The Message of The Quran",
  },
  {
    identifier: "en.pickthall",
    name: "Mohammed Pickthall",
    language: "English",
    englishName: "The Meaning of the Glorious Quran",
  },
  {
    identifier: "ur.jalandhry",
    name: "Fateh Muhammad Jalandhry",
    language: "Urdu",
    englishName: "Urdu Translation",
  },
  {
    identifier: "fr.hamidullah",
    name: "Muhammad Hamidullah",
    language: "French",
    englishName: "Le Saint Coran",
  },
  {
    identifier: "tr.ates",
    name: "Suleyman Ates",
    language: "Turkish",
    englishName: "Kuran-ı Kerim Tefsiri",
  },
];

export default function QuranPage() {
  // Basic states
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);
  const [ayahs, setAyahs] = useState<Ayah[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Search states
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [filteredSurahs, setFilteredSurahs] = useState<Surah[]>([]);

  // Audio states
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAyah, setCurrentAyah] = useState<number>(0);
  const [volume, setVolume] = useState(1);
  const [selectedReciter, setSelectedReciter] = useState<string>(
    RECITERS[0].identifier
  );

  // Translation states
  const [selectedTranslation, setSelectedTranslation] = useState<string>(
    TRANSLATIONS[0].identifier
  );

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Fetch Surahs on mount
  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        const response = await fetch("https://api.alquran.cloud/v1/surah");
        const data = await response.json();
        if (data.code === 200) {
          setSurahs(data.data);
          setFilteredSurahs(data.data);
        } else {
          throw new Error("Failed to fetch surahs");
        }
      } catch (error) {
        setError("Failed to load Quran data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchSurahs();
  }, []);

  // Handle search
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredSurahs(surahs);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = surahs.filter(
      (surah) =>
        surah.englishName.toLowerCase().includes(query) ||
        surah.englishNameTranslation.toLowerCase().includes(query) ||
        surah.number.toString().includes(query)
    );
    setFilteredSurahs(filtered);
  }, [searchQuery, surahs]);

  // Fetch Ayahs when surah or reciter/translation changes
  useEffect(() => {
    const fetchAyahs = async () => {
      if (!selectedSurah) return;

      setLoading(true);
      try {
        const [arabicResponse, translationResponse, audioResponse] =
          await Promise.all([
            fetch(`https://api.alquran.cloud/v1/surah/${selectedSurah.number}`),
            fetch(
              `https://api.alquran.cloud/v1/surah/${selectedSurah.number}/${selectedTranslation}`
            ),
            fetch(
              `https://api.alquran.cloud/v1/surah/${selectedSurah.number}/${selectedReciter}`
            ),
          ]);

        const [arabicData, translationData, audioData] = await Promise.all([
          arabicResponse.json(),
          translationResponse.json(),
          audioResponse.json(),
        ]);

        const combinedAyahs = arabicData.data.ayahs.map(
          (ayah: Ayah, index: number) => ({
            number: ayah.numberInSurah,
            text: ayah.text,
            translation: translationData.data.ayahs[index].text,
            audio: audioData.data.ayahs[index].audio,
          })
        );

        setAyahs(combinedAyahs);
        setCurrentAyah(0);
        setIsPlaying(false);
      } catch (error) {
        setError("Failed to load surah data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAyahs();
  }, [selectedSurah, selectedReciter, selectedTranslation]);

  // Handle audio playback
  useEffect(() => {
    if (!audioRef.current) return;

    const handleEnded = () => {
      if (currentAyah < ayahs.length - 1) {
        setCurrentAyah((prev) => prev + 1);
      } else {
        setIsPlaying(false);
        setCurrentAyah(0);
      }
    };

    audioRef.current.addEventListener("ended", handleEnded);
    return () => {
      audioRef.current?.removeEventListener("ended", handleEnded);
    };
  }, [currentAyah, ayahs.length]);

  useEffect(() => {
    if (!audioRef.current || !ayahs.length) return;

    audioRef.current.src = ayahs[currentAyah].audio;
    audioRef.current.volume = volume;

    if (isPlaying) {
      audioRef.current.play().catch(() => setIsPlaying(false));
    }
  }, [currentAyah, ayahs, isPlaying, volume]);

  const togglePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(console.error);
    }
    setIsPlaying(!isPlaying);
  };

  const handlePrevious = () => {
    if (currentAyah > 0) {
      setCurrentAyah((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentAyah < ayahs.length - 1) {
      setCurrentAyah((prev) => prev + 1);
    }
  };
  if (loading && !selectedSurah) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-900">
        <div className="text-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
          <p className="text-gray-300">Loading Quran data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen dark:bg-gray-900 text-heading p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <header className="text-center space-y-2 font-poppin mt-6 ">
          <h1 className="text-3xl font-bold">The Holy Quran</h1>
          <p className="text-paragraph-400 font-[500]">Listen and read with translation</p>
        </header>

        {/* Selection Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Surah Selection */}
          {/* Surah Selection */}
          <Card className="p-4 ">
            <Popover open={isSearchOpen} onOpenChange={setIsSearchOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={isSearchOpen}
                  className="w-full justify-between text-heading hover:text-heading"
                >
                  {selectedSurah
                    ? `${selectedSurah.number}. ${selectedSurah.englishName}`
                    : "Select Surah"}
                  <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[300px] p-0 PopoverContent ">
                <div className="px-3 py-2">
                  <input
                    className="w-full  rounded-md px-3 py-2 text-sm  "
                    placeholder="Search surah..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <ScrollArea className="h-[300px] py-2">
                  {filteredSurahs.length === 0 ? (
                    <div className="text-center py-4 ">
                      No surah found
                    </div>
                  ) : (
                    filteredSurahs.map((surah) => (
                      <div
                        key={surah.number}
                        onClick={() => {
                          setSelectedSurah(surah);
                          setIsSearchOpen(false);
                          setSearchQuery("");
                        }}
                        className="px-3 py-2  cursor-pointer flex items-center justify-between  hover:bg-primary hover:text-white"
                      >
                        <div className="flex items-center gap-2 ">
                          <span className=" min-w-[2rem]">
                            {surah.number}.
                          </span>
                          <span>{surah.englishName}</span>
                        </div>
                        <span className="font-arabic text-lg ">
                          {surah.name}
                        </span>
                      </div>
                    ))
                  )}
                </ScrollArea>
              </PopoverContent>
            </Popover>
          </Card>

          {/* Reciter Selection */}
          <Card className="p-4">
            <Select value={selectedReciter} onValueChange={setSelectedReciter}>
              <SelectTrigger className="w-full  border-gray-300 focus:border-gray-300 focus:border-1 ">
                <SelectValue placeholder="Select Reciter" />
              </SelectTrigger>
              <SelectContent className="text-heading">
                {RECITERS.map((reciter) => (
                  <SelectItem
                    key={reciter.identifier}
                    value={reciter.identifier}
                    className=" "
                  >
                    {reciter.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Card>

          {/* Translation Selection */}
          <Card className="p-4 ">
            <Select
              value={selectedTranslation}
              onValueChange={setSelectedTranslation}
            >
              <SelectTrigger className="w-full  text-ellipsis border-gray-300 focus:border-gray-300 focus:border-1">
                <SelectValue placeholder="Select Translation"  />
              </SelectTrigger>
              <SelectContent className="text-heading w-full Select ">
                {TRANSLATIONS.map((translation) => (
                  <SelectItem
                    key={translation.identifier}
                    value={translation.identifier}
                    className=" "
                  >
                    <div className="flex flex-col">
                      <span>{translation.name}</span>
                      <span className="text-sm ">
                        {translation.language} - {translation.englishName}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Card>
        </div>

        {/* Audio Player and Ayahs */}
        {selectedSurah && (
          <>
            <Card className="p-4 ">
              <div className="space-y-4">
                {/* Surah Info */}
                <div className="text-center space-y-2">
                  <h2 className="text-xl font-semibold">
                    {selectedSurah.englishName}
                  </h2>
                  <div className="flex items-center justify-center gap-2">
                    <p className="text-heading">
                      {selectedSurah.englishNameTranslation}
                    </p>
                    <span className="text-gray-600">•</span>
                    <p className="font-arabic text-lg">{selectedSurah.name}</p>
                  </div>
                </div>

                {/* Audio Controls */}
                <div className="flex flex-col items-center gap-4">
                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handlePrevious}
                      disabled={currentAyah === 0}
                      className="hover:bg-gray-700"
                    >
                      <SkipBack className="h-6 w-6" />
                    </Button>

                    <Button
                      onClick={togglePlayPause}
                      size="icon"
                      className="h-12 w-12 rounded-full bg-blue-600 hover:bg-blue-700"
                    >
                      {isPlaying ? (
                        <Pause className="h-6 w-6" />
                      ) : (
                        <Play className="h-6 w-6" />
                      )}
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleNext}
                      disabled={currentAyah === ayahs.length - 1}
                      className="hover:bg-gray-700"
                    >
                      <SkipForward className="h-6 w-6" />
                    </Button>
                  </div>

                  <div className="flex items-center gap-2">
                    <Volume2 className="h-4 w-4" />
                    <Slider
                      value={[volume * 100]}
                      onValueChange={(value) => setVolume(value[0] / 100)}
                      max={100}
                      step={1}
                      className="w-[100px]"
                    />
                  </div>
                </div>

                <audio ref={audioRef} />
              </div>
            </Card>

            {/* Ayahs Display */}
            <div className="space-y-4 text-heading">
              {ayahs.map((ayah, index) => (
                <Card
                  key={ayah.numberInSurah}
                  className={`p-4 ${
                    index === currentAyah
                      ? "bg-[#BCE6FF] dark:bg-gray-800 "
                      : "bg-transparent"
                  }`}
                >
                  <div className="space-y-3 ">
                    <div className="flex justify-between items-center text-heading font-poppin">
                      <span >Verse {ayah.numberInSurah}</span>
                      {index === currentAyah && isPlaying && (
                        <span className="text-blue-400">Now Playing</span>
                      )}
                    </div>
                    <p className="text-xl text-right font-arabic leading-relaxed">
                      {ayah.text}
                    </p>
                    <p className="leading-relaxed">
                      {ayah.translation}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </>
        )}

        {error && (
          <div className="p-4 bg-red-900/50 text-red-200 rounded-lg text-center">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
