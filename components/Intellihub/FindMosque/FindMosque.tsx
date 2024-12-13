"use client";

import { useState, useEffect } from "react";
import {
  MapPin,
  Clock,
  Phone,
  Globe,
  Star,
  Navigation,
  Info,
  Calendar,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Location {
  lat: number;
  lng: number;
  address: string;
}

interface PrayerTimes {
  fajr: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
}

interface Mosque {
  id: string;
  name: string;
  distance: number;
  address: string;
  phone?: string;
  website?: string;
  rating: number;
  prayerTimes: PrayerTimes;
  facilities: string[];
  images?: string[];
  jummahTimes?: string[];
}

interface HijriDate {
  day: number;
  month: string;
  year: number;
}

function IslamicClock() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [hijriDate, setHijriDate] = useState<HijriDate | null>(null);
  const [currentPrayer, setCurrentPrayer] = useState<string>("");
  const [nextPrayer, setNextPrayer] = useState<string>("");
  const [timeUntilNext, setTimeUntilNext] = useState<string>("");

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Fetch Hijri date
  useEffect(() => {
    const fetchHijriDate = async () => {
      try {
        const today = new Date();
        const response = await fetch(
          `http://api.aladhan.com/v1/gToH/${today.getDate()}-${
            today.getMonth() + 1
          }-${today.getFullYear()}`
        );
        const data = await response.json();
        setHijriDate({
          day: parseInt(data.data.hijri.day),
          month: data.data.hijri.month.en,
          year: parseInt(data.data.hijri.year),
        });
      } catch (error) {
        console.error("Error fetching Hijri date:", error);
      }
    };

    fetchHijriDate();
  }, []);

  // Calculate current and next prayer times
  useEffect(() => {
    const prayerTimes = [
      { name: "Fajr", time: "5:30 AM" },
      { name: "Sunrise", time: "6:45 AM" },
      { name: "Dhuhr", time: "1:30 PM" },
      { name: "Asr", time: "4:45 PM" },
      { name: "Maghrib", time: "7:30 PM" },
      { name: "Isha", time: "9:00 PM" },
    ];

    const now = currentTime;
    const getPrayerDate = (timeStr: string) => {
      const [time, period] = timeStr.split(" ");
      const [hours, minutes] = time.split(":");
      const date = new Date(now);
      let hour = parseInt(hours);
      if (period === "PM" && hour !== 12) hour += 12;
      else if (period === "AM" && hour === 12) hour = 0;
      date.setHours(hour, parseInt(minutes), 0);
      return date;
    };

    let current = "";
    let next = "";
    let timeUntil = "";

    for (let i = 0; i < prayerTimes.length; i++) {
      const prayerTime = getPrayerDate(prayerTimes[i].time);
      const nextPrayerTime = prayerTimes[i + 1]
        ? getPrayerDate(prayerTimes[i + 1].time)
        : getPrayerDate(prayerTimes[0].time);

      if (now < prayerTime) {
        next = prayerTimes[i].name;
        const diff = prayerTime.getTime() - now.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        timeUntil = `${hours}h ${minutes}m`;
        break;
      } else if (now >= prayerTime && now < nextPrayerTime) {
        current = prayerTimes[i].name;
        next = prayerTimes[i + 1]?.name || prayerTimes[0].name;
        const diff = nextPrayerTime.getTime() - now.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        timeUntil = `${hours}h ${minutes}m`;
        break;
      }
    }

    setCurrentPrayer(current);
    setNextPrayer(next);
    setTimeUntilNext(timeUntil);
  }, [currentTime]);

  return (
    <Card className="">
      <div className="p-4 space-y-4">
        <div className="flex justify-center items-center gap-3">
          <Clock className="h-5 w-5 text-paragraph" />
          <span className="text-2xl font-bold">
            {currentTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
          </span>
        </div>

        {hijriDate && (
          <div className="flex justify-center items-center gap-2 text-paragraph">
            <Calendar className="h-4 w-4" />
            <span>
              {hijriDate.day} {hijriDate.month} {hijriDate.year} H
            </span>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-sm text-paragraph">Current Prayer</div>
            <div className="font-semibold text-blue-400">
              {currentPrayer || "Before Fajr"}
            </div>
          </div>
          <div>
            <div className="text-sm text-paragraph">Next Prayer</div>
            <div className="font-semibold text-gray-300">
              {nextPrayer}
              {timeUntilNext && (
                <div className="text-xs text-paragraph">in {timeUntilNext}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

const MOCK_MOSQUES: Mosque[] = [
  {
    id: "1",
    name: "Central Mosque",
    distance: 0.5,
    address: "123 Islamic Center Way",
    phone: "+1 234-567-8900",
    website: "www.centralmosque.com",
    rating: 4.8,
    prayerTimes: {
      fajr: "5:30 AM",
      dhuhr: "1:30 PM",
      asr: "4:45 PM",
      maghrib: "7:30 PM",
      isha: "9:00 PM",
    },
    facilities: [
      "Parking",
      "Wudu Area",
      "Women's Section",
      "Library",
      "Islamic School",
    ],
    jummahTimes: ["1:30 PM", "2:30 PM"],
  },
  {
    id: "2",
    name: "Community Masjid",
    distance: 1.2,
    address: "456 Community Drive",
    phone: "+1 234-567-8901",
    rating: 4.6,
    prayerTimes: {
      fajr: "5:35 AM",
      dhuhr: "1:35 PM",
      asr: "4:50 PM",
      maghrib: "7:35 PM",
      isha: "9:05 PM",
    },
    facilities: ["Parking", "Wudu Area", "Women's Section", "Children's Area"],
    jummahTimes: ["1:45 PM"],
  },
];

export default function MosqueFinder() {
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [locationStatus, setLocationStatus] = useState<
    "loading" | "granted" | "denied" | "error"
  >("loading");
  const [nearbyMosques, setNearbyMosques] = useState<Mosque[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkLocationPermission = async () => {
      try {
        if (!navigator.geolocation) {
          setError("Geolocation is not supported by your browser");
          setLocationStatus("error");
          return;
        }

        // Check for permissions
        if ("permissions" in navigator) {
          const permission = await navigator.permissions.query({
            name: "geolocation",
          });

          if (permission.state === "denied") {
            setError(
              "Location permission is denied. Please enable it in your browser settings."
            );
            setLocationStatus("denied");
            return;
          }
        }

        // Get current position with timeout
        const getPosition = () =>
          new Promise<GeolocationPosition>((resolve, reject) => {
            const timeoutId = setTimeout(() => {
              reject(new Error("Location request timed out"));
            }, 10000);

            navigator.geolocation.getCurrentPosition(
              (position) => {
                clearTimeout(timeoutId);
                resolve(position);
              },
              (error) => {
                clearTimeout(timeoutId);
                reject(error);
              },
              {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0,
              }
            );
          });

        const position = await getPosition();

        // Get address from coordinates
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`,
            {
              headers: {
                "Accept-Language": "en",
              },
            }
          );
          const data = await response.json();

          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            address: data.display_name || "Location found",
          });
          setLocationStatus("granted");

          // Set mock mosques data
          setNearbyMosques(MOCK_MOSQUES);
        } catch (geocodeError) {
          console.error("Geocoding error:", geocodeError);
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            address: "Location found",
          });
          setLocationStatus("granted");
          setNearbyMosques(MOCK_MOSQUES);
        }
      } catch (err) {
        console.error("Location error:", err);
        if (err instanceof GeolocationPositionError) {
          switch (err.code) {
            case err.PERMISSION_DENIED:
              setError(
                "Location permission denied. Please enable location services."
              );
              setLocationStatus("denied");
              break;
            case err.POSITION_UNAVAILABLE:
              setError("Location information is unavailable.");
              setLocationStatus("error");
              break;
            case err.TIMEOUT:
              setError("Location request timed out. Please try again.");
              setLocationStatus("error");
              break;
            default:
              setError("An unknown error occurred getting your location.");
              setLocationStatus("error");
          }
        } else {
          setError("Failed to get location. Please try again.");
          setLocationStatus("error");
        }
      }
    };

    checkLocationPermission();
  }, []);

  const getDirections = (mosque: Mosque) => {
    if (!userLocation) return;
    window.open(
      `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${
        userLocation.lng
      }&destination=${encodeURIComponent(mosque.address)}`,
      "_blank"
    );
  };

  if (locationStatus === "loading") {
    return (
      <div className="min-h-screen  p-4">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
          <p>Getting your location...</p>
        </div>
      </div>
    );
  }

  if (locationStatus === "denied") {
    return (
      <div className="min-h-screen  text-gray-100 p-4">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="bg-yellow-900/50 text-yellow-200 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">
              Location Access Required
            </h2>
            <p>Please enable location services to find mosques near you.</p>
            <div className="mt-4 space-y-2 text-sm text-left">
              <p>To enable location:</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>Click the lock/info icon in your browser&apos;s address bar</li>
                <li>Find &quot;Location or &quot;Site Settings</li>
                <li>Change the permission to &quot;Allow&quot;</li>
                <li>Refresh this page</li>
              </ol>
            </div>
          </div>
          <Button
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Retry with Location
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <header className="text-center space-y-4 mt-6">
          <h1 className="text-3xl font-bold text-heading">Nearby Mosques</h1>
          {userLocation && (
            <p className="text-paragraph flex items-center justify-center gap-2">
              <MapPin className="h-4 w-4" />
              {userLocation.address}
            </p>
          )}

          {/* Islamic Clock */}
          <Card className="max-w-sm mx-auto">
            <IslamicClock />
          </Card>
        </header>

        {/* Mosques List */}
        <div className="space-y-4">
          {nearbyMosques.map((mosque) => (
            <Card
              key={mosque.id}
              className="p-4   transition-colors"
            >
              <div className="space-y-4">
                {/* Mosque Header */}
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h2 className="text-xl font-semibold">{mosque.name}</h2>
                    <p className="text-paragraph flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {mosque.address} ({mosque.distance} km away)
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <span className="font-medium">{mosque.rating}</span>
                  </div>
                </div>

                {/* Prayer Times */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                  {Object.entries(mosque.prayerTimes).map(([prayer, time]) => (
                    <Card
                      key={prayer}
                      className="p-2 rounded-lg text-center shadow-2xl"
                    >
                      <p className="text-sm text-gray-400 capitalize">
                        {prayer}
                      </p>
                      <p className="font-medium">{time}</p>
                    </Card>
                  ))}
                </div>

                {/* Jummah Times */}
                {mosque.jummahTimes && mosque.jummahTimes.length > 0 && (
                  <div className=" p-2 rounded-lg">
                    <p className="text-sm text-green-400 mb-1">Jummah Prayer</p>
                    <div className="flex gap-2">
                      {mosque.jummahTimes.map((time, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-green-900/30 rounded-full text-sm"
                        >
                          {time}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Facilities */}
                <div className="flex flex-wrap gap-2">
                  {mosque.facilities.map((facility) => (
                    <Card
                      key={facility}
                      className="px-2 py-1 rounded-full text-sm text-heading shadow-2xl"
                    >
                      {facility}
                    </Card>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    onClick={() => getDirections(mosque)}
                    className="flex-1 gap-2"
                    variant="outline"
                  >
                    <Navigation className="h-4 w-4" />
                    Get Directions
                  </Button>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="flex-1 gap-2">
                        <Info className="h-4 w-4" />
                        More Info
                      </Button>
                    </DialogTrigger>
                    <DialogContent >
                      <DialogHeader>
                        <DialogTitle>{mosque.name}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        {mosque.phone && (
                          <a
                            href={`tel:${mosque.phone}`}
                            className="flex items-center gap-2 text-blue-400 hover:underline"
                          >
                            <Phone className="h-4 w-4" />
                            {mosque.phone}
                          </a>
                        )}
                        {mosque.website && (
                          <a
                            href={`https://${mosque.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-blue-400 hover:underline"
                          >
                            <Globe className="h-4 w-4" />
                            {mosque.website}
                          </a>
                        )}

                        <div className="space-y-2">
                          <h3 className="font-medium">Facilities</h3>
                          <div className="flex flex-wrap gap-2">
                            {mosque.facilities.map((facility) => (
                              <Card
                                key={facility}
                                className="p-3 shadow-2xl rounded-full text-sm"
                              >
                                {facility}
                              </Card>
                            ))}
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
