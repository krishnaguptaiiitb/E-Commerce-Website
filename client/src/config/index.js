export const registerFormControls = [
  {
    name: "firstName",
    label: "First Name:",
    placeholder: "Enter your first name",
    componentType: "input",
    type: "text",
    validation: {
      required: true,
      minLength: 2,
      maxLength: 50,
    },
  },
  {
    name: "lastName",
    label: "Last Name:",
    placeholder: "Enter your last name",
    componentType: "input",
    type: "text",
    validation: {
      required: true,
      minLength: 2,
      maxLength: 50,
    },
  },
  {
    name: "username",
    label: "Username:",
    placeholder: "Choose a username",
    componentType: "input",
    type: "text",
    validation: {
      required: true,
      minLength: 3,
      maxLength: 20,
      pattern: /^[a-zA-Z0-9_]+$/,
    },
  },
  {
    name: "email",
    label: "Email:",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
    validation: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
  },
  {
    name: "password",
    label: "Password:",
    placeholder: "Create a password",
    componentType: "input",
    type: "password",
    validation: {
      required: true,
      minLength: 8,
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
    },
  },
  {
    name: "confirmPassword",
    label: "Confirm Password:",
    placeholder: "Confirm your password",
    componentType: "input",
    type: "password",
    validation: {
      required: true,
      validate: (value, allValues) => value === allValues.password,
    },
  },
  {
    name: "phone",
    label: "Phone Number:",
    placeholder: "Enter your phone number",
    componentType: "input",
    type: "tel",
    validation: {
      required: true,
      pattern: /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/,
    },
  },
  {
    name: "dateOfBirth",
    label: "Date of Birth:",
    componentType: "input",
    type: "date",
    validation: {
      required: true,
      validate: (value) => {
        const birthDate = new Date(value);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        return age >= 13;
      },
    },
  },
  {
    name: "gender",
    label: "Gender:",
    componentType: "select",
    options: [
      { value: "", label: "Select gender" },
      { value: "male", label: "Male" },
      { value: "female", label: "Female" },
      { value: "other", label: "Other" },
      { value: "prefer_not_to_say", label: "Prefer not to say" },
    ],
    validation: {
      required: true,
    },
  },
  {
    name: "country",
    label: "Country:",
    componentType: "select",
    options: [
      { value: "", label: "Select your country" },
      { value: "us", label: "United States" },
      { value: "ca", label: "Canada" },
      { value: "uk", label: "United Kingdom" },
      { value: "au", label: "Australia" },
      { value: "de", label: "Germany" },
      { value: "fr", label: "France" },
      { value: "in", label: "India" },
      // Add more countries as needed
    ],
    validation: {
      required: true,
    },
  },
  {
    name: "city",
    label: "City:",
    placeholder: "Enter your city",
    componentType: "input",
    type: "text",
    validation: {
      required: true,
    },
  },
  {
    name: "zipCode",
    label: "Zip/Postal Code:",
    placeholder: "Enter your zip code",
    componentType: "input",
    type: "text",
    validation: {
      required: true,
      pattern: /^[0-9]{5}(-[0-9]{4})?$/,
    },
  },
  {
    name: "terms",
    label: "Terms:",
    placeholder: "I agree to the terms and conditions",
    componentType: "checkbox",
    type: "checkbox",
    validation: {
      required: true,
    },
  },
  {
    name: "profileType",
    label: "Profile Type:",
    componentType: "radio",
    options: [
      { value: "personal", label: "Personal Account" },
      { value: "business", label: "Business Account" },
      { value: "developer", label: "Developer Account" },
    ],
    validation: {
      required: true,
    },
  },
  {
    name: "bio",
    label: "Bio:",
    placeholder: "Tell us about yourself...",
    componentType: "textarea",
    rows: 4,
    validation: {
      required: true,
      maxLength: 500,
    },
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email:",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password:",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const addProductFormElement = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
    // required: true,
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { value: "men", label: "Men" },
      { value: "women", label: "Women" },
      { value: "kids", label: "Kids" },
      { value: "accessories", label: "Accessories" },
      { value: "footwear", label: "Footwear" },
    ],
  },
  {
    label: "Brand",
    name: "brand",
    componentType: "select",
    options: [
      { id: "nike", label: "Nike" },
      { id: "adidas", label: "Adidas" },
      { id: "puma", label: "Puma" },
      { id: "levi", label: "Levis" },
      { id: "zara", label: "Zara" },
      { id: "h$m", label: "H$M" },
    ],
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price (optional)",
  },
  {
    label: "Total Stock",
    name: "stock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock quantity",
  },
];

export const shoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "Home",
    path: "/shop/home",
  },
  {
    id: "men",
    label: "Men",
    path: "/shop/listing",
  },
  {
    id: "women",
    label: "Women",
    path: "/shop/listing",
  },
  {
    id: "kids",
    label: "Kids",
    path: "/shop/listing",
  },
  {
    id: "footwear",
    label: "Footwear",
    path: "/shop/listing",
  },
  {
    id: "accessories",
    label: "Accessories",
    path: "/shop/listing",
  },
];

export const categoryOptionMap = {
  men: "Men",
  women: "Women",
  kids: "Kids",
  accessorries: "Accessories",
  footwear: "Footwear",
};

export const brandOptionMap = {
  nike: "Nike",
  adidas: "Adidas",
  puma: "Puma",
  levis: "Levis",
  zara: "Zara",
  "h&m": "H&M",
};

export const filterOptions = {
  category: [
    { id: "men", label: "Men" },
    { id: "women", label: "Women" },
    { id: "kids", label: "Kids" },
    { id: "accessories", label: "Accessories" },
    { id: "footwear", label: "Footwear" },
  ],
  brand: [
    { id: "nike", label: "Nike" },
    { id: "adidas", label: "Adidas" },
    { id: "puma", label: "Puma" },
    { id: "levis", label: "Levis" },
    { id: "zara", label: "Zara" },
    { id: "h&m", label: "H&M" },
  ],
};

export const sortOptions = [
  { id: "price-lowtohigh", label: "Low to High" },
  { id: "price-hightolow", label: "High to Low" },
  { id: "title-atoz", label: "Title A to Z" },
  { id: "title-ztoa", label: "Title Z to A" },
];
