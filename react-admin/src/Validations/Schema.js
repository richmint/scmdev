import * as yup from "yup";

export const LoginSchema = yup.object().shape({
  email: yup.string().email().required("Email is required field"),
  password: yup.string().required("Password is required field"),
});

export const BuyRawMaterialSchema = yup.object().shape({
  whHashAdr: yup.string().required("Warehouse Address is required field"),
  buyPolysterAmount: yup.string().required("Polyster Amount is required field"),
  buyCottonAmount: yup.string().required("Polyster Amount is required field"),
  buyWoolAmount: yup.string().required("Wool Amount is required field"),
});

export const SpinningbatchcompleteformSchema = yup.object().shape({
  yarnamount: yup.string().required("Yarn Amount is required field"),
  yarncolor: yup.string().required("Yarn Color is required field"),
  yarntype: yup.string().required("Yarn Type is required field"),
});

export const GarmentBatchCompleteFormSchema = yup.object().shape({
  totalitems: yup.string().required("Total Item is required field"),
  description: yup.string().required("Description is required field"),
});
export const SellItemFormDataSchema = yup.object().shape({
  shirtproduced: yup.string().required("Total Item is required field"),
  unitSupply: yup.string().required("Description is required field"),
});

export const AddNewUserByAdminSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  hashAddress: yup.string().required("Hash address is require"),
  email:yup.string().email().required("Email is Required"),
  address:yup.string().required("Location is required")
}); 
export const AddMaterialSchema = yup.object().shape({
  polysteramount: yup.string().required("Polyster Amount is required"),
  cottonamount: yup.string().required("Cotton Amount is require"),
  woolamount:yup.string().email().required("Wool Amount is Required"),
});
