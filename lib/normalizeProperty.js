// Some properties in the database were created under an older schema
// (address.street, details.sqft, images as plain path strings, listingType).
// This adapts any raw property document to the shape the current API/UI expect.
export function normalizeProperty(doc) {
   if (!doc) return doc;

   const location = doc.location ?? {};
   const legacyAddress = doc.address ?? {};
   const features = doc.features ?? {};
   const legacyDetails = doc.details ?? {};
   const statusMap = { sell: 'for-sale', rent: 'for-rent' };

   const images = (doc.images ?? []).map((image) =>
      typeof image === 'string'
         ? { url: image, public_id: null }
         : { url: image.url, public_id: image.public_id ?? null }
   );

   return {
      ...doc,
      location: {
         address: location.address ?? legacyAddress.street ?? '',
         city: location.city ?? legacyAddress.city ?? '',
         state: location.state ?? legacyAddress.state ?? '',
         zipCode: location.zipCode ?? legacyAddress.zipCode ?? '',
      },
      status: ['for-sale', 'for-rent', 'sold', 'rented'].includes(doc.status)
         ? doc.status
         : statusMap[doc.listingType] ?? 'for-sale',
      features: {
         area: features.area ?? legacyDetails.sqft ?? 0,
         bedrooms: features.bedrooms ?? legacyDetails.bedrooms ?? 0,
         bathrooms: features.bathrooms ?? legacyDetails.bathrooms ?? 0,
         parking: features.parking ?? 0,
      },
      images,
      amenities: doc.amenities ?? [],
   };
}
