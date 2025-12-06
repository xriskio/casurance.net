import { useState, useEffect } from "react";
import { Shield, Star } from "lucide-react";

import chubbLogo from "@assets/CHUBB_Logo_Black_RBG_1765003273332.jpg";
import cnaLogo from "@assets/CNA_FINANCIAL_CORPORATION_LOGO_1765003273331.jpg";
import guardLogo from "@assets/simple-insurance-carriers__0008_berkshire-hathaway-guard-insur_1765003273331.png";
import amtrustLogo from "@assets/simple-insurance-carriers__0012_AmTrust-insurance_1765003273332.png";
import pieLogo from "@assets/Pie_Insurance_Logo_1765003273331.jpg";
import biberkLogo from "@assets/biberk_logo_1765003273331.jpg";
import greatAmericanLogo from "@assets/gaig_logo_web_full_color_1765003246023.png";
import stateFundLogo from "@assets/9cK0r1ow_400x400_1765003246024.png";
import atlasLogo from "@assets/atlas_1765003273330.png";
import appliedLogo from "@assets/Applied_Underwriters_Logo_Logo_1765003273331.jpg";
import accreditedLogo from "@assets/accredited_1765003273330.png";
import foremostLogo from "@assets/Foremost-Insurance-Group-logo_1765003246023.png";
import bristolWestLogo from "@assets/bristol-west-logo_1765003198315.jpg";
import crumForsterLogo from "@assets/926_photo_3957_1765003198315.png";
import nautilusLogo from "@assets/images_(3)_1765003198316.png";
import navigatorsLogo from "@assets/images_(2)_1765003198316.png";
import westchesterLogo from "@assets/Westchester-PNG_1765003198316.png";
import bhhcLogo from "@assets/DbGzbhXE_400x400_1765003198316.jpg";
import philadelphiaLogo from "@assets/Philadelphia_Insurance_Companies_Logo_1765003246021.jpg";
import tokioMarineLogo from "@assets/Tokio_Marine.svg_1765003246021.png";
import msigLogo from "@assets/MSIG_USA_Logo_1765003246022.jpg";
import coverysLogo from "@assets/images_(1)_1765003246022.png";
import aonLogo from "@assets/Aon_Corporation_logo.svg_1765003246022.png";
import arrowheadLogo from "@assets/arrowhead_1765003246022.jpg";
import delosLogo from "@assets/Delos_Insurance_Logo_1765003246023.jpg";
import kemperLogo from "@assets/Kemper_Logo_Color_Web_1765003246023.jpg";

const carrierPartners = [
  { name: "Chubb", logo: chubbLogo, rating: "A++", description: "World's Largest P&C Insurer" },
  { name: "CNA Insurance", logo: cnaLogo, rating: "A", description: "Fortune 500 Leader" },
  { name: "Guard Insurance", logo: guardLogo, rating: "A+", description: "Berkshire Hathaway Company" },
  { name: "AmTrust", logo: amtrustLogo, rating: "A-", description: "Workers' Comp Specialists" },
  { name: "PIE Insurance", logo: pieLogo, rating: "A-", description: "Simple & Fast Coverage" },
  { name: "biBERK", logo: biberkLogo, rating: "A++", description: "Berkshire Hathaway Company" },
  { name: "Great American", logo: greatAmericanLogo, rating: "A+", description: "Over 150 Years Strong" },
  { name: "State Fund", logo: stateFundLogo, rating: "A", description: "California's Largest WC Carrier" },
  { name: "Atlas General", logo: atlasLogo, rating: "A", description: "Specialty Insurance Solutions" },
  { name: "Applied Underwriters", logo: appliedLogo, rating: "A", description: "Integrated Risk Solutions" },
  { name: "Accredited", logo: accreditedLogo, rating: "A-", description: "Program Management Experts" },
  { name: "Philadelphia Insurance", logo: philadelphiaLogo, rating: "A++", description: "Tokio Marine Group" },
  { name: "Tokio Marine", logo: tokioMarineLogo, rating: "A++", description: "Global Insurance Leader" },
  { name: "Foremost Insurance", logo: foremostLogo, rating: "A", description: "Farmers Insurance Group" },
  { name: "Bristol West", logo: bristolWestLogo, rating: "A", description: "Farmers Insurance Group" },
  { name: "Crum & Forster", logo: crumForsterLogo, rating: "A", description: "Fairfax Company Since 1822" },
  { name: "Nautilus Insurance", logo: nautilusLogo, rating: "A+", description: "Berkley Company" },
  { name: "Navigators", logo: navigatorsLogo, rating: "A+", description: "The Hartford Brand" },
  { name: "Westchester", logo: westchesterLogo, rating: "A++", description: "A Chubb Company" },
  { name: "BHHC", logo: bhhcLogo, rating: "A++", description: "Berkshire Hathaway Homestate" },
  { name: "MSIG North America", logo: msigLogo, rating: "A+", description: "Global Insurance Group" },
  { name: "Coverys", logo: coverysLogo, rating: "A-", description: "Medical Professional Liability" },
  { name: "AON", logo: aonLogo, rating: "A", description: "Global Risk Management" },
  { name: "Arrowhead", logo: arrowheadLogo, rating: "A", description: "General Insurance Agency" },
  { name: "Delos Insurance", logo: delosLogo, rating: "A-", description: "Specialty Programs" },
  { name: "Kemper", logo: kemperLogo, rating: "A-", description: "Personal & Commercial Lines" },
];

export default function TrustedCarriers() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carrierPartners.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Shield className="h-4 w-4" />
            <span>26+ A-Rated Carrier Partners</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Partnered with Industry-Leading Carriers
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We work with top-rated insurance companies to find you the best coverage at competitive rates
          </p>
        </div>

        <div 
          className="flex justify-center mb-10"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="bg-card rounded-2xl shadow-lg p-8 text-center min-w-[320px] md:min-w-[400px] border border-border relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-blue-500 to-primary"></div>
            <div className="flex justify-center items-center h-20 mb-4">
              <img 
                src={carrierPartners[currentIndex].logo} 
                alt={carrierPartners[currentIndex].name}
                className="max-h-16 max-w-[260px] object-contain transition-all duration-500"
              />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-1">
              {carrierPartners[currentIndex].name}
            </h3>
            <div className="flex items-center justify-center gap-2 mb-2">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              <span className="text-sm font-semibold text-yellow-600">AM Best: {carrierPartners[currentIndex].rating}</span>
            </div>
            <p className="text-muted-foreground text-sm">
              {carrierPartners[currentIndex].description}
            </p>
            <div className="mt-4 flex justify-center gap-1">
              {carrierPartners.slice(0, 12).map((_, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex % 12 ? 'bg-primary w-4' : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'}`}
                  data-testid={`carousel-dot-${idx}`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-9 gap-3">
          {carrierPartners.map((carrier, index) => (
            <div 
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`bg-card rounded-lg p-3 text-center border transition-all duration-300 cursor-pointer hover:shadow-md ${index === currentIndex ? 'border-primary shadow-md ring-2 ring-primary/20' : 'border-border hover:border-primary/50'}`}
              data-testid={`carrier-${index}`}
            >
              <div className="h-10 flex items-center justify-center mb-1">
                <img 
                  src={carrier.logo} 
                  alt={carrier.name}
                  className="max-h-8 max-w-full object-contain"
                />
              </div>
              <p className="text-[10px] font-medium text-muted-foreground truncate">{carrier.name}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            All carriers are rated A- or better by AM Best
          </p>
        </div>
      </div>
    </section>
  );
}
