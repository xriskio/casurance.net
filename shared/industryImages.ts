// Industry images mapping for Solutions by Industry section and industry detail pages
import agribusinessImg from "@assets/generated_images/Professional_agribusiness_farm_operation_6de71bcb.png";
import aerospaceImg from "@assets/generated_images/Aerospace_manufacturing_facility_interior_47c09a65.png";
import cannabisImg from "@assets/generated_images/Professional_cannabis_cultivation_facility_f66d8f20.png";
import constructionImg from "@assets/generated_images/Commercial_construction_site_progress_653ea7ad.png";
import educationImg from "@assets/generated_images/Modern_educational_institution_campus_0ebb3566.png";
import entertainmentImg from "@assets/generated_images/Professional_entertainment_venue_interior_26714870.png";
import financialImg from "@assets/generated_images/Modern_financial_district_buildings_5b83c218.png";
import healthcareImg from "@assets/generated_images/Modern_healthcare_facility_interior_5ec517f0.png";
import energyImg from "@assets/generated_images/Renewable_energy_infrastructure_landscape_ab78bb69.png";
import firearmsImg from "@assets/generated_images/Professional_firearms_retail_store_0f52db0c.png";
import hospitalityImg from "@assets/generated_images/Upscale_hotel_hospitality_interior_34b6dbeb.png";
import lifeSciencesImg from "@assets/generated_images/Modern_life_sciences_laboratory_7286af3d.png";
import manufacturingImg from "@assets/generated_images/Advanced_manufacturing_production_facility_0537b20a.png";
import medicalProfessionalsImg from "@assets/generated_images/Medical_professionals_in_hospital_5a3dbf4a.png";
import nonprofitImg from "@assets/generated_images/Community_nonprofit_organization_building_7051c93a.png";
import publicSectorImg from "@assets/generated_images/Modern_public_sector_building_b7f5a5a4.png";
import realEstateImg from "@assets/generated_images/Commercial_real_estate_development_8b915513.png";
import religiousOrgImg from "@assets/generated_images/Religious_institution_building_exterior_ca4b4ab3.png";
import retailImg from "@assets/generated_images/Modern_retail_store_interior_e6c68993.png";
import sportsImg from "@assets/generated_images/Professional_sports_facility_interior_74e5eae2.png";
import securityServicesImg from "@assets/generated_images/Professional_security_services_officer_5a548eee.png";
import warehousingImg from "@assets/generated_images/Modern_warehouse_distribution_center_0acd3ddc.png";
import nemtParatransitImg from "@assets/generated_images/NEMT_wheelchair_accessible_van_19f1036f.png";
import transportationImg from "@assets/generated_images/Professional_commercial_trucking_fleet_9adb2e6f.png";

export const industryImages: Record<string, string> = {
  "agribusiness-industry": agribusinessImg,
  "aerospace": aerospaceImg,
  "cannabis": cannabisImg,
  "construction": constructionImg,
  "education": educationImg,
  "entertainment-industry": entertainmentImg,
  "financial": financialImg,
  "healthcare": healthcareImg,
  "energy-industry": energyImg,
  "firearms": firearmsImg,
  "hospitality": hospitalityImg,
  "life-sciences-industry": lifeSciencesImg,
  "manufacturing": manufacturingImg,
  "medical-professionals": medicalProfessionalsImg,
  "nemt-paratransit": nemtParatransitImg,
  "nonprofit": nonprofitImg,
  "public-sector": publicSectorImg,
  "real-estate": realEstateImg,
  "religious-organizations": religiousOrgImg,
  "retail": retailImg,
  "sports": sportsImg,
  "security-services": securityServicesImg,
  "warehousing-distribution": warehousingImg,
  "transportation": transportationImg,
};

export function getIndustryImage(slug: string): string | undefined {
  return industryImages[slug];
}
