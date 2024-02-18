import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";
export const createCategoryController = async(req , res)=>{
    try{
        const{name} = req.body;
        // field validation
        if(!name){
            return res.status(400).json({
                success: false,
                message: 'Please fill all fields'
            })
        }
        const existingCategory = await
         categoryModel.findOne({name});
        if(existingCategory){
            return res.status(400).json({
                success: false,
                message: 'Category already exists'
            });
        }
        const category = await 
        new 
        categoryModel({name , slug: slugify(name),}).save();
        res.status(201).json({
            success: true,
            message: 'Category created successfully',
            category,
        });
    }
    catch(error){
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Errro in Create-Category",
    });
    }

}

// update controller

export const updateCategoryController = async(req, res)=>{
    try{
        const{name} = req.body;
        const{id} =req.params;

        const category = await categoryModel.findByIdAndUpdate(id , {name , slug:slugify(name)},{new:true}); 
        res.status(200).send({
      success: true,
      messsage: "Category Updated Successfully",
      category,
    });

    }catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Errro in Update-Category",
        });
    }


}



// get all categories controller

export const AllcategoryControlller = async(req , res)=>{
    try{
        const category = await categoryModel.find({});
        res.status(200).json({
            success: true,
            message: 'Get All Categories',
            category,
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Errro in All-Category",
        });
    }

}

// single category
export const singleCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      message: "Get SIngle Category SUccessfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While getting Single Category",
    });
  }
};

//delete category
export const deleteCategoryCOntroller = async (req, res) => {
  try {
    const { id } = req.params;
    await categoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Categry Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while deleting category",
      error,
    });
  }
};