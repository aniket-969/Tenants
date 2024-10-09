export const validate = (schema) =>async(req,res,next)=>{
  try {
      console.log("validate",req.body)
      next()
  } catch (error) {
    console.error("validation error"+error.errors)
    res.status(400).json({
        message:"validation failed",
        errors:error.errors
    })
  }
}