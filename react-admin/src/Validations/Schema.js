import * as yup from "yup";
export const LoginSchema = yup.object().shape({
  email: yup.string().email().required("Email is required field"),
  password: yup.string().required("Password is required field"),
});
export const BuyRawMaterialSchema = yup.object().shape({
  whHashAdr: yup.string().required("Warehouse Address is required field"),
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
  distributeradrs: yup.string().required("Distributer address is required field"),
});
export const AddNewUserByAdminSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  hashAddress: yup.string().required("Hash address is require"),
  email:yup.string().email().required("Email is Required"),
  address:yup.string().required("Location is required")
}); 
export const AddMaterialSchema = yup.object().shape({
  polysteramount: yup.number().required("Polyster Amount is required"),
  cottonamount: yup.number().required("Cotton Amount is require"),
  woolamount:yup.number().required("Wool Amount is Required"),
});
export const CottonMaterialSchema = yup.object().shape({
  CottonWeight: yup.string().required("Cotton Weight is required"),
  fiberlength: yup.string().required("Fiber Length is require"),
  fiberStrength:yup.string().required("Fiber Strength is Required"),
  cottonMike:yup.string().required("Cotton Mike is Required"),
  fqi:yup.string().required("FQI is Required"),
});
export const PolyesterMaterialSchema = yup.object().shape({
  polyesterFmax: yup.string().required("Polyester Fmax is required"),
  polyesteremax: yup.string().required("Polyester Emax is require"),
  polyesterNeps:yup.string().required("Polyester Neps is Required"),
  polysterCvm:yup.string().required("Polyester CVM is Required"),
});
export const WoolMaterialSchema = yup.object().shape({
  woolDialmeter: yup.string().required("Wool Dialmeter is required"),
  woolStapleLength: yup.string().required("Wool Staple Length is require"),
  woolFiberLength:yup.string().required("Wool Fiber Length is Required"),
  woolCrimpiness:yup.string().required("Wool Crimpiness is Required"),
});
export const ProductQCSchema = yup.object().shape({
  product: yup.string().required("Fill the final good product")
})
export const SellToRetailerFormSchema = yup.object().shape({
  productQty: yup.string().required("Required Field")
})
export const ProductBuyCustomerSchema = yup.object().shape({
  productQty: yup.number().required("Required Field")
})
