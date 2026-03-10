/**
 * 🍱 Mumbai Tiffin Service - Plan Builder
 *
 * Mumbai ki famous tiffin delivery service hai. Customer ka plan banana hai
 * using destructuring parameters aur rest/spread operators.
 *
 * Functions:
 *
 *   1. createTiffinPlan({ name, mealType = "veg", days = 30 })
 *      - Destructured parameter with defaults!
 *      - Meal prices per day: veg=80, nonveg=120, jain=90
 *      - Agar mealType unknown hai, return null
 *      - Agar name missing/empty, return null
 *      - Return: { name, mealType, days, dailyRate, totalCost }
 *
 *   2. combinePlans(...plans)
 *      - Rest parameter! Takes any number of plan objects
 *      - Each plan: { name, mealType, days, dailyRate, totalCost }
 *      - Return: { totalCustomers, totalRevenue, mealBreakdown }
 *      - mealBreakdown: { veg: count, nonveg: count, ... }
 *      - Agar koi plans nahi diye, return null
 *
 *   3. applyAddons(plan, ...addons)
 *      - plan: { name, mealType, days, dailyRate, totalCost }
 *      - Each addon: { name: "raita", price: 15 }
 *      - Add each addon price to dailyRate
 *      - Recalculate totalCost = new dailyRate * days
 *      - Return NEW plan object (don't modify original)
 *      - addonNames: array of addon names added
 *      - Agar plan null hai, return null
 *
 * Hint: Use { destructuring } in params, ...rest for variable args,
 *   spread operator for creating new objects
 *
 * @example
 *   createTiffinPlan({ name: "Rahul" })
 *   // => { name: "Rahul", mealType: "veg", days: 30, dailyRate: 80, totalCost: 2400 }
 *
 *   combinePlans(plan1, plan2, plan3)
 *   // => { totalCustomers: 3, totalRevenue: 7200, mealBreakdown: { veg: 2, nonveg: 1 } }
 */
export function createTiffinPlan({ name, mealType = "veg", days = 30 } = {}) {
  const mealRates = {
    veg: 80,
    nonveg: 120,
    jain: 90,
  };

  if (
    typeof name !== "string" ||
    name === "" ||
    !Object.prototype.hasOwnProperty.call(mealRates, mealType)
  ) {
    return null;
  }

  return {
    name,
    mealType,
    days,
    dailyRate: mealRates[mealType],
    totalCost: mealRates[mealType] * days,
  };
}

export function combinePlans(...plans) {
  if (plans.length === 0) {
    return null;
  }

  return {
    totalCustomers: plans.length,
    totalRevenue: plans.reduce((sum, plan) => sum + plan.totalCost, 0),
    mealBreakdown: plans.reduce((breakdown, plan) => {
      breakdown[plan.mealType] = (breakdown[plan.mealType] || 0) + 1;
      return breakdown;
    }, {}),
  };
}

export function applyAddons(plan, ...addons) {
  if (plan === null || plan === undefined) {
    return null;
  }

  const addonPrice = addons.reduce((sum, addon) => sum + addon.price, 0);
  return {
    ...plan,
    dailyRate: plan.dailyRate + addonPrice,
    totalCost: (plan.dailyRate + addonPrice) * plan.days,
    addonNames: addons.map((addon) => addon.name),
  };
}
