//local storage
const ar = localStorage["ar"];
// check namenameEn,nameAr,sale,price,categorysAr,categorysEn
export const validationBasic = (
  nameEn,
  nameAr,
  sale,
  price,
  categorysAr,
  categorysEn
) => {
  const regex =
    /[\u0600-\u06ff]|[\u0750-\u077f]|[\ufb50-\ufbc1]|[\ufbd3-\ufd3f]|[\ufd50-\ufd8f]|[\ufd92-\ufdc7]|[\ufe70-\ufefc]|[\uFDF0-\uFDFD]/;
  let errorList = [];

  if (!nameEn || !nameAr || !price || !categorysAr || !categorysEn)
    errorList.push(!ar ? "All Fields is Requird" : "جميع الحقول مطلوبة");

  if ((nameAr && nameAr.length < 3) || (nameEn && nameEn.length < 3))
    errorList.push(
      !ar
        ? "Product name must at least 3 letter"
        : "اسم المنتج يجب ان يكون علي الاقل ثلاثة أحرف"
    );

  if (!regex.test(nameAr))
    errorList.push(
      !ar
        ? "Product name must be Arabic Letters "
        : "اسم المنتج يجب ان يكون حروف عربية"
    );

  if (sale < 0 || sale > 100)
    errorList.push(
      !ar
        ? "Product sale must between zero and 100 percentage "
        : "خصم المنتج يجب ان يكون محصور بين الصفر و المائة"
    );

  if (price <= 0)
    errorList.push(!ar ? "Product Price not correct " : "سعر المنتج غير صحيح");

  if (!categorysAr || !categorysEn) {
    errorList.push(!ar ? "Product Category required " : "  قسم المنتج مطلوب");
  }
  return errorList;
};
//check imageLeft, imageMiddle, imageRight

export const validationImages = (imageLeft, imageMiddle, imageRight) => {
  let errorList = [];

  if (!imageLeft || !imageMiddle || !imageRight)
    errorList.push(
      !ar
        ? "You need to upload 3 images for product"
        : "يجب رفع ثلاثة صور للمنتج"
    );

  return errorList;
};
//check  brand, descriptionAr, descriptionEn
export const validationMeta = (brand, descriptionAr, descriptionEn) => {
  const regex =
    /[\u0600-\u06ff]|[\u0750-\u077f]|[\ufb50-\ufbc1]|[\ufbd3-\ufd3f]|[\ufd50-\ufd8f]|[\ufd92-\ufdc7]|[\ufe70-\ufefc]|[\uFDF0-\uFDFD]/;
  let errorList = [];
  if (!brand || !descriptionAr || !descriptionEn)
    errorList.push(!ar ? "All Fields is Requird" : "جميع الحقول مطلوبة");

  if (
    (descriptionAr && descriptionAr.length < 20) ||
    (descriptionEn && descriptionEn.length < 20)
  )
    errorList.push(
      !ar
        ? "Product description must at least 20 letters"
        : "وصف المنتج يجب ان يكون علي الاقل عشرون حرف"
    );
  if (!regex.test(descriptionAr))
    errorList.push(
      !ar
        ? "Product name must be Arabic Letters "
        : "اسم المنتج يجب ان يكون حروف عربية"
    );
  if (brand && brand.length < 3)
    errorList.push(
      !ar
        ? "Product brand must at least 3 letter"
        : "ماركة المنتج يجب ان تكون علي الاقل ثلاثة أحرف"
    );

  return errorList;
};
