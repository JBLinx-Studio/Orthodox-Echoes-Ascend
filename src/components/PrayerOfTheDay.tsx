
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bookmark } from 'lucide-react';

const PRAYERS = [
  {
    title: "The Jesus Prayer",
    text: "Lord Jesus Christ, Son of God, have mercy on me, a sinner.",
    author: "Desert Fathers Tradition"
  },
  {
    title: "Prayer Before Communion",
    text: "I believe, O Lord, and I confess that Thou art truly the Christ, the Son of the Living God, who came into the world to save sinners, of whom I am the first.",
    author: "St. John Chrysostom"
  },
  {
    title: "Morning Prayer",
    text: "O Lord, grant that I may meet all that this coming day brings to me with spiritual tranquility. Grant that I may fully surrender myself to Thy holy will.",
    author: "Metropolitan Philaret of Moscow"
  },
  {
    title: "Prayer for the Departed",
    text: "Grant rest, O Lord, to the soul of Thy servant who has fallen asleep, and make his memory to be eternal.",
    author: "Orthodox Memorial Service"
  },
  {
    title: "Prayer to the Holy Spirit",
    text: "O Heavenly King, the Comforter, the Spirit of Truth, Who art everywhere present and fillest all things, Treasury of blessings and Giver of life: Come and abide in us, and cleanse us from every impurity, and save our souls, O Good One.",
    author: "Pentecost Service"
  }
];

export function PrayerOfTheDay() {
  const [prayer, setPrayer] = useState(PRAYERS[0]);
  const [isRevealing, setIsRevealing] = useState(false);
  
  useEffect(() => {
    // Select a prayer based on the day of the year
    const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    const prayerIndex = dayOfYear % PRAYERS.length;
    setPrayer(PRAYERS[prayerIndex]);
    
    // Animate the prayer text
    setIsRevealing(true);
  }, []);
  
  return (
    <Card className="bg-[#1A1F2C]/70 backdrop-blur-md border-gold/20 overflow-hidden">
      <CardHeader className="pb-3 pt-6 bg-gradient-to-r from-byzantine/10 via-gold/5 to-byzantine/10">
        <div className="flex items-center space-x-2">
          <Bookmark className="h-5 w-5 text-gold" />
          <CardTitle className="text-xl font-display text-gold/90">Prayer of the Day</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-4 pb-6">
        <h3 className="font-display text-lg text-white mb-3">{prayer.title}</h3>
        <blockquote className={`prayer-reveal italic text-gray-300 mb-4 delay-300`} style={{animationDelay: "300ms"}}>
          "{prayer.text}"
        </blockquote>
        <div className="text-right text-sm text-gold/60 font-display">
          — {prayer.author}
        </div>
      </CardContent>
    </Card>
  );
}
