let RECIPES = [
    {
        image: "https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2023/09/Vegetable-Soup-main.jpg",
        name: "The Sup",
        description: "A tasty soup de alouche must put the mounth..." 
    },
    {
        image: "https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2023/09/Vegetable-Soup-main.jpg",
        name: "The Sup",
        description: "A tasty soup de alouche must put the mounth..." 
    },
    {
        image: "https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2023/09/Vegetable-Soup-main.jpg",
        name: "The Sup",
        description: "A tasty soup de alouche must put the mounth..." 
    },

];

//RECIPE handlers
let recipeHandler = {
    container: document.getElementById("recipes-container"), 
    display() {
       let recipeDisplayHTMLs = ``;
       for (let i = 0;i < RECIPES.length;i++) {
           const {image, name, description} = RECIPES[i];
           let recipeDisplayHTML = `
                <div class="relative">
                    <div class="hidden p-2 flex gap-2 absolute right-0">
                        <button class="hover:text-nature text-upperGray px-2 py-1 bg-white" onclick="">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button class="hover:text-scarlet text-upperGray px-2 py-1 bg-white">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>

                    <a href="./?id=${i}">
                        <div class="rounded-lg overflow-hidden w-52 h-56 bg-gray cursor-pointer">
                            <div>
                                <img class="h-36 w-full" src="${image}" onerror="replaceSrc(event)" />
                             </div>
                             <div class="pt-1 pl-3">
                                <h5 class="font-medium">${name}</h5>
                                <div class="text-sm text-upperGray">
                                    ${limitString(description,55)}
                                </div>
                             </div>
                        </div>
                    </a>
                </div>
           `;
           recipeDisplayHTMLs += recipeDisplayHTML;
       }
       this.container.innerHTML = recipeDisplayHTMLs;
    },
    add(image,name,description) {
        const newRecipe = {image,name,description};
        RECIPES.push(newRecipe);
        this.display();

        this.save();
    },
    load() {
        const recipes = localStorage.getItem("recipes") || "[]";
        RECIPES = JSON.parse(recipes);
    },
    save() {
        localStorage.setItem("recipes",JSON.stringify(RECIPES));
    }
}

// MODAL
let recipeModal = {
    modal: document.getElementById("create-recipe-modal"),
    form: document.querySelector("#create-recipe-modal form"),
    shadow: document.getElementById("modal-shadow"),
    show() {
        this.shadow.classList.remove("hidden");
        this.modal.classList.remove("hidden");
    },
    hide(isReset) {
        this.shadow.classList.add("hidden");
        this.modal.classList.add("hidden");

        if (isReset) this.form.reset();
    },
    add() {
        const formData = new FormData(this.form);
        
        const image = formData.get("image");
        const name = formData.get("name");
        const description = formData.get("description");
        recipeHandler.add(image,name,description);
        
        this.form.reset();
    }
};


// Simple Routing

const ROUTES = {
    gallery: document.getElementById("recipes-gallery"),
    view: document.getElementById("recipe-view")
}

function switchToGallery() {
    ROUTES.gallery.classList.remove("hidden");
    ROUTES.view.classList.add("hidden");
    recipeHandler.display();
}

function switchToView(id) {
    ROUTES.gallery.classList.add("hidden");
    ROUTES.view.classList.remove("hidden")

    displayView(id);
}

function checkForRecipeID() {
    const params = new URL(document.location).searchParams;
    const id = params.get("id");

    recipeHandler.load();

    if (id == null) switchToGallery(); 
    else switchToView(id);
}

function displayView(id) {
    const {image, name, description} = RECIPES[id];

    const imageHTML = document.getElementById("view-image");
    const nameHTML = document.getElementById("view-name");
    const descriptionHTML = document.getElementById("view-description");

    imageHTML.src = image;
    nameHTML.innerHTML = name;
    descriptionHTML.innerHTML = description;
}

window.addEventListener("DOMContentLoaded",function() {
    checkForRecipeID();
});


// -< UTILS >- 
function replaceSrc(event) {
    event.target.src = "https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg";
}

function limitString(string,length) {
    if (length >= string.length) return string;
    return string.slice(0,length) + "...";
}
