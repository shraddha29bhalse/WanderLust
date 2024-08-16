const Listing =require("../models/listing.js");
//index route:done
module.exports.index=async (req, res) => {
    const allListing = await Listing.find({});
    res.render("listings/index.ejs", { allListing });
};

//New Route
module.exports.renderNewForm= async (req, res) => { 
    res.render("listings/new.ejs");
};


//show route
module.exports.show=(async (req, res) => {
 let { id } = req.params;
   const listing = await Listing.findById(id)
    .populate({path :"reviews",
        populate:{
            path:"author",
        },
    })
    .populate("owner");
    if(!listing){
        req.flash("error","Requested Listing does not exist");
        res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs", { listing });
});


//create route
module.exports.create =(async (req, res, next) => {
    let url=req.file.path;
    let filename=req.file.filename;

    const newListing = new Listing(req.body.listing);
    newListing.owner= req.user._id;
    newListing.image={url,filename};
    await newListing.save();
    req.flash("success","New Listing Created");
    res.redirect("/listings");
});

//edit route
module.exports.edit=(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    req.flash("success","Listing Edited");
    res.render("listings/edit.ejs", { listing });
});

//update route
module.exports.update=(async (req, res) => {
    let { id } = req.params;
    let listing=await Listing.findByIdAndUpdate(id, { ...req.body.listing });

    if(typeof res.file!=="undefined"){
    let url=req.path;
    let filename=req.file.filename;
    listing.image={url,filename};
    await listing.save();
    }   
    req.flash("success","Listing Updated");
    res.redirect(`/listings/${id}`);
});

//delete route
module.exports.delete =(async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success","Listing Deleted");
    res.redirect("/listings");
});