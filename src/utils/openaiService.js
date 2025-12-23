import { API_CONFIG } from './apiConfig';

/**
 * @param {Object} formData
 * @returns {Promise<string>}
 */
export const generateListingDescription = async (formData) => {
  const apiKey = API_CONFIG.OPENAI_API_KEY;

  if (!apiKey || apiKey === 'YOUR_API_KEY_HERE') {
    throw new Error(
      "OpenAI API key is not configured. Please add your API key."
    );
  }
  const listingDetails = buildListingDetails(formData);

  const systemPrompt = `You are a professional copywriter specializing in creating compelling listing descriptions. Create a clear, engaging, and professional description based on the provided details. The description should be informative and persuasive.`;

  const userPrompt = `Create a professional listing description based on these details:

${listingDetails}

Please write a well-structured description that:
1. Highlights the key features and benefits
2. Uses clear and engaging language
3. Is between 100-200 words
4. Includes relevant details provided
5. Is suitable for a classified ads platform

Write only the description without any additional commentary.`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(
        error.error?.message || "Failed to generate description"
      );
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error generating description:", error);
    throw error;
  }
};

/**
 * Build a formatted string of listing details from form data
 * @param {Object} formData - The form data
 * @returns {string} - Formatted listing details
 */
const buildListingDetails = (formData) => {
  const details = [];

  // Basic Information
  if (formData.title) details.push(`Title: ${formData.title}`);
  if (formData.category) details.push(`Category: ${formData.category}`);
  if (formData.SubCategory) details.push(`Sub-Category: ${formData.SubCategory}`);
  if (formData.Price) details.push(`Price: ${formData.Price} SAR`);

  // Location
  if (formData.selectedCityData) details.push(`City: ${formData.selectedCityData}`);
  if (formData.districtSelected) details.push(`District: ${formData.districtSelected}`);
  if (formData.selectedRegionId) details.push(`Region: ${formData.selectedRegionId}`);

  // Product/Item Specific Details
  if (formData.Condition) details.push(`Condition: ${formData.Condition}`);
  if (formData.Brand) details.push(`Brand: ${formData.Brand}`);
  if (formData.Model) details.push(`Model: ${formData.Model}`);
  if (formData.Make) details.push(`Make: ${formData.Make}`);
  if (formData.Color) details.push(`Color: ${formData.Color}`);
  if (formData.Material) details.push(`Material: ${formData.Material}`);
  if (formData.Size) details.push(`Size: ${formData.Size}`);

  // Motors Specific
  if (formData.ManufactureYear) details.push(`Year: ${formData.ManufactureYear}`);
  if (formData.kmDriven) details.push(`Kilometers: ${formData.kmDriven} km`);
  if (formData.Transmission) details.push(`Transmission: ${formData.Transmission}`);
  if (formData.FuelType) details.push(`Fuel Type: ${formData.FuelType}`);
  if (formData.EngineCapacity) details.push(`Engine: ${formData.EngineCapacity}`);
  if (formData.Insurance) details.push(`Insurance: ${formData.Insurance}`);

  // Real Estate Specific
  if (formData.PropertyType) details.push(`Property Type: ${formData.PropertyType}`);
  if (formData.NumberOfBedrooms) details.push(`Bedrooms: ${formData.NumberOfBedrooms}`);
  if (formData.NumberOfBathrooms) details.push(`Bathrooms: ${formData.NumberOfBathrooms}`);
  if (formData.PropertySize) details.push(`Size: ${formData.PropertySize} sqm`);
  if (formData.Floor) details.push(`Floor: ${formData.Floor}`);
  if (formData.PropertyAge) details.push(`Age: ${formData.PropertyAge}`);
  if (formData.streetWidth) details.push(`Street Width: ${formData.streetWidth}m`);
  if (formData.Amenities) details.push(`Amenities: ${formData.Amenities}`);
  if (formData.PropertyFeatures) details.push(`Features: ${formData.PropertyFeatures}`);

  // Electronics Specific
  if (formData.Warranty) details.push(`Warranty: ${formData.Warranty}`);
  if (formData.Storage) details.push(`Storage: ${formData.Storage}`);
  if (formData.RAM) details.push(`RAM: ${formData.RAM}`);
  if (formData.ScreenSize) details.push(`Screen Size: ${formData.ScreenSize}`);

  // Job Board Specific
  if (formData.JobTitle) details.push(`Job Title: ${formData.JobTitle}`);
  if (formData.Company) details.push(`Company: ${formData.Company}`);
  if (formData.JobType) details.push(`Job Type: ${formData.JobType}`);
  if (formData.EmploymentType) details.push(`Employment Type: ${formData.EmploymentType}`);
  if (formData.ExperienceLevel) details.push(`Experience Level: ${formData.ExperienceLevel}`);
  if (formData.Industry) details.push(`Industry: ${formData.Industry}`);

  // General Features
  if (formData.Features) details.push(`Features: ${formData.Features}`);
  if (formData.Type) details.push(`Type: ${formData.Type}`);
  if (formData.SellerType) details.push(`Seller Type: ${formData.SellerType}`);

  return details.length > 0
    ? details.join("\n")
    : "No specific details provided";
};
