export const CaculateDiscountPrice = (price, discountPercent) => {
    return price * (1 - discountPercent / 100);
};