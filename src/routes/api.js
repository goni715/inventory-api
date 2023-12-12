const express =require('express');
const AuthVerifyMiddleware=require("../middlewares/AuthVerifyMiddleware");
const UsersController = require("../controllers/Users/UsersController");
const BrandsController = require("../controllers/Brands/BrandsController");
const CategoriesController = require("../controllers/Categories/CategoriesController");
const CustomersController = require("../controllers/Customers/CustomersController");
const SuppliersController = require("../controllers/Suppliers/SuppliersController");
const ExpenseTypesController = require("../controllers/Expenses/ExpenseTypesController");
const ExpensesController = require("../controllers/Expenses/ExpensesController");
const ProductsController = require("../controllers/Products/ProductsController");
const PurchasesController = require("../controllers/Purchases/PurchasesController");
const SalesController = require("../controllers/Sales/SalesController");
const ReturnsController = require("../controllers/Returns/ReturnsController");
const ReportController = require("../controllers/Report/ReportController");
const SummaryController = require("../controllers/Summary/SummaryController");


const router = express.Router();



//This is HomePage
router.get('/', function(req,res){
    res.end('This is HomePage')
});

//Users
router.post("/Registration",UsersController.Registration);
router.post("/Login",UsersController.Login);
router.post("/ProfileUpdate",AuthVerifyMiddleware,UsersController.ProfileUpdate);
router.get("/ProfileDetails",AuthVerifyMiddleware,UsersController.ProfileDetails);

router.get("/SignUpEmailVerify/:email",UsersController.SignUpEmailVerify);
router.post('/SignUpVerifyOTP/:email/:otp',UsersController.SignUpVerifyOTP);

//ChangePassword
router.get("/ChangePassword/:currentPassword/:newPassword",AuthVerifyMiddleware, UsersController.ChangePassword);


//RecoverPassword
router.get("/ForgotPasswordVerifyEmail/:email",UsersController.ForgotPasswordVerifyEmail);
router.get("/ForgotPasswordVerifyOTP/:email/:otp",UsersController.ForgotPasswordVerifyOTP);
router.post("/CreateNewPassword",UsersController.CreateNewPassword);



//Brands
router.post("/CreateBrand", AuthVerifyMiddleware, BrandsController.CreateBrand);
router.post("/UpdateBrand/:id", AuthVerifyMiddleware, BrandsController.UpdateBrand);
router.get("/BrandList/:pageNo/:perPage/:searchKeyword", AuthVerifyMiddleware,BrandsController.BrandList);
router.get("/BrandDropDown", AuthVerifyMiddleware, BrandsController.BrandDropDown);
router.get("/DeleteBrand/:id",BrandsController.DeleteBrand);
router.get("/BrandDetailsByID/:id",BrandsController.BrandDetailsByID);



// Categories
router.post("/CreateCategory",AuthVerifyMiddleware,CategoriesController.CreateCategory);
router.post("/UpdateCategory/:id",AuthVerifyMiddleware,CategoriesController.UpdateCategory);
router.get("/CategoriesList/:pageNo/:perPage/:searchKeyword",AuthVerifyMiddleware,CategoriesController.CategoriesList);
router.get("/CategoriesDropDown",AuthVerifyMiddleware,CategoriesController.CategoriesDropDown);
router.get("/DeleteCategory/:id",AuthVerifyMiddleware,CategoriesController.DeleteCategory);
router.get("/CategoryDetailsByID/:id",AuthVerifyMiddleware,CategoriesController.CategoryDetailsByID);



// Customers
router.post("/CreateCustomer",AuthVerifyMiddleware,CustomersController.CreateCustomer);
router.post("/UpdateCustomer/:id",AuthVerifyMiddleware,CustomersController.UpdateCustomer);
router.get("/CustomersList/:pageNo/:perPage/:searchKeyword",AuthVerifyMiddleware,CustomersController.CustomersList);
router.get("/CustomersDropDown",AuthVerifyMiddleware,CustomersController.CustomersDropDown);
router.get("/DeleteCustomer/:id",AuthVerifyMiddleware,CustomersController.DeleteCustomer);
router.get("/CustomerDetailsByID/:id",AuthVerifyMiddleware,CustomersController.CustomerDetailsByID);




// Suppliers
router.post("/CreateSupplier",AuthVerifyMiddleware,SuppliersController.CreateSupplier);
router.post("/UpdateSupplier/:id",AuthVerifyMiddleware,SuppliersController.UpdateSupplier);
router.get("/SuppliersList/:pageNo/:perPage/:searchKeyword",AuthVerifyMiddleware,SuppliersController.SuppliersList);
router.get("/SuppliersDropDown",AuthVerifyMiddleware,SuppliersController.SuppliersDropDown);
router.get("/DeleteSupplier/:id",AuthVerifyMiddleware,SuppliersController.DeleteSupplier);
router.get("/SupplierDetailsByID/:id",AuthVerifyMiddleware,SuppliersController.SupplierDetailsByID);




// ExpenseTypes
router.post("/CreateExpenseTypes",AuthVerifyMiddleware,ExpenseTypesController.CreateExpenseTypes);
router.post("/UpdateExpenseTypes/:id",AuthVerifyMiddleware,ExpenseTypesController.UpdateExpenseTypes);
router.get("/ExpenseTypesList/:pageNo/:perPage/:searchKeyword",AuthVerifyMiddleware,ExpenseTypesController.ExpenseTypesList);
router.get("/ExpenseTypesDropDown",AuthVerifyMiddleware,ExpenseTypesController.ExpenseTypesDropDown);
router.get("/DeleteExpenseTypes/:id",AuthVerifyMiddleware,ExpenseTypesController.DeleteExpenseTypes);
router.get("/ExpenseTypesDetailsByID/:id",AuthVerifyMiddleware,ExpenseTypesController.ExpenseTypesDetailsByID);


// Expenses
router.post("/CreateExpense",AuthVerifyMiddleware,ExpensesController.CreateExpense);
router.post("/UpdateExpense/:id",AuthVerifyMiddleware,ExpensesController.UpdateExpense);
router.get("/ExpensesList/:pageNo/:perPage/:searchKeyword",AuthVerifyMiddleware,ExpensesController.ExpensesList);
router.get("/DeleteExpense/:id",AuthVerifyMiddleware,ExpensesController.DeleteExpense);
router.get("/ExpenseDetailsByID/:id",AuthVerifyMiddleware,ExpensesController.ExpenseDetailsByID);



// Products
router.post("/CreateProduct",AuthVerifyMiddleware,ProductsController.CreateProduct);
router.post("/UpdateProduct/:id",AuthVerifyMiddleware,ProductsController.UpdateProduct);
router.get("/ProductsList/:pageNo/:perPage/:searchKeyword",AuthVerifyMiddleware,ProductsController.ProductsList);
router.get("/DeleteProduct/:id",AuthVerifyMiddleware,ProductsController.DeleteProduct);
router.get("/ProductsDetailsByID/:id",AuthVerifyMiddleware,ProductsController.ProductsDetailsByID);
router.get("/ProductsDropDown",AuthVerifyMiddleware,ProductsController.ProductsDropDown);




//Purchases
router.post("/CreatePurchase",AuthVerifyMiddleware,PurchasesController.CreatePurchase);
router.get("/PurchasesList/:pageNo/:perPage/:searchKeyword",AuthVerifyMiddleware,PurchasesController.PurchasesList);
router.get("/PurchasesDelete/:id",AuthVerifyMiddleware,PurchasesController.PurchasesDelete);


//Sales
router.post("/CreateSales",AuthVerifyMiddleware,SalesController.CreateSales);
router.get("/SalesList/:pageNo/:perPage/:searchKeyword",AuthVerifyMiddleware,SalesController.SalesList);
router.get("/SaleDelete/:id",AuthVerifyMiddleware,SalesController.SaleDelete);


//Return
router.post("/CreateReturns",AuthVerifyMiddleware,ReturnsController.CreateReturns);
router.get("/ReturnsList/:pageNo/:perPage/:searchKeyword",AuthVerifyMiddleware,ReturnsController.ReturnsList);
router.get("/ReturnDelete/:id",AuthVerifyMiddleware,ReturnsController.ReturnDelete);




//Report
router.post("/ExpensesByDate",AuthVerifyMiddleware,ReportController.ExpensesByDate);
router.post("/ReturnByDate",AuthVerifyMiddleware,ReportController.ReturnByDate);
router.post("/PurchaseByDate",AuthVerifyMiddleware,ReportController.PurchaseByDate);
router.post("/SalesByDate",AuthVerifyMiddleware,ReportController.SalesByDate);


//Summary
router.get("/ExpensesSummary",AuthVerifyMiddleware,SummaryController.ExpensesSummary);
router.get("/ReturnSummary",AuthVerifyMiddleware,SummaryController.ReturnSummary);
router.get("/PurchaseSummary",AuthVerifyMiddleware,SummaryController.PurchaseSummary);
router.get("/SalesSummary",AuthVerifyMiddleware,SummaryController.SalesSummary);
















module.exports=router;

