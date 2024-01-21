export const createDataFromApi = (json: any) => {
  const jsonData = json;
  const initData = {
    male: 0,
    female: 0,
    ageRange: "",
    hair: {
      Black: 0,
      Blond: 0,
      Chestnut: 0,
      Brown: 0,
    },
    addressUser: {},
  };

  const resData = jsonData.users.reduce((prv: any, cur: any) => {
    const department = cur.company.department;
    const gender = cur.gender;
    const hairColor = cur.hair.color;

    //กำหนดค่าเริ่มต้น
    if (!prv[department]) prv[department] = initData;

    //ค่าผลรวมของค่าต่างๆ
    const valueMale = prv[department]["male"] ? prv[department]["male"] : 0;
    const valueFemale = prv[department]["female"]
      ? prv[department]["female"]
      : 0;
    const valueHairBlack = prv[department]["hair"]["Black"]
      ? prv[department]["hair"]["Black"]
      : 0;
    const valueHairBlond = prv[department]["hair"]["Blond"]
      ? prv[department]["hair"]["Blond"]
      : 0;
    const valueHairChestnut = prv[department]["hair"]["Chestnut"]
      ? prv[department]["hair"]["Chestnut"]
      : 0;
    const valueHairBrown = prv[department]["hair"]["Brown"]
      ? prv[department]["hair"]["Brown"]
      : 0;

    const sumMale = gender === "male" ? valueMale + 1 : valueMale;
    const sumFemale = gender === "female" ? valueFemale + 1 : valueFemale;
    const sumHairBlack =
      hairColor === "Black" ? valueHairBlack + 1 : valueHairBlack;
    const sumHairBlond =
      hairColor === "Blond" ? valueHairBlond + 1 : valueHairBlond;
    const sumHairChestnut =
      hairColor === "Chestnut" ? valueHairChestnut + 1 : valueHairChestnut;
    const sumHairBrown =
      hairColor === "Brown" ? valueHairBrown + 1 : valueHairBrown;

    //   map รายชื่อ users แต่ละแผนก
    let nameOfUsers = {} as any;
    let ageAvg = [] as any;
    jsonData.users
      .filter((item: any) => item.company.department === department)
      .forEach((item: any) => {
        const fullName = item.firstName + item.lastName;
        const postalCode = item.address.postalCode;
        ageAvg.push(item.age);
        nameOfUsers[fullName] = postalCode;
      });

    //  หาค่าเฉลี่ยอายุทุกคนในแผนก
    ageAvg = Math.floor(
      ageAvg.reduce((a: number, b: number) => a + b) / ageAvg.length
    );

    //   จัด format data เพื่อให้ได้ผลลัพธ์ตามที่ต้องการ
    prv[department] = {
      male: sumMale,
      female: sumFemale,
      ageRange: getAgeRange(ageAvg),
      hair: {
        Black: sumHairBlack,
        Blond: sumHairBlond,
        Chestnut: sumHairChestnut,
        Brown: sumHairBrown,
      },
      addressUser: { ...nameOfUsers },
    };

    return prv;
  }, {});
  return resData;
};

//  หาช่วงอายุ
export const getAgeRange = (age: number) => {
  const ageRange = [
    { label: "13-19", condition: (age: number) => age >= 13 && age <= 19 },
    { label: "20-29", condition: (age: number) => age >= 20 && age <= 29 },
    { label: "30-39", condition: (age: number) => age >= 30 && age <= 39 },
    { label: "40-49", condition: (age: number) => age >= 40 && age <= 49 },
    { label: "50-59", condition: (age: number) => age >= 50 && age <= 59 },
    { label: "60-69", condition: (age: number) => age >= 60 && age <= 69 },
    { label: "70-79", condition: (age: number) => age >= 70 && age <= 79 },
  ];

  for (const group of ageRange) {
    if (group.condition(age)) {
      return group.label;
    }
  }
  return "Unknown Age Range";
};
