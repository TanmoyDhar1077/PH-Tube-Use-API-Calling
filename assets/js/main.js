// console.log('Hello, World!');

function loadCategories() {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
};

function displayCategories(categories) {
    // console.log(categories);
    const categoryContainer = document.getElementById('categories-container');
    categories.forEach(data => {
        const categoriesDiv = document.createElement('div');
        categoriesDiv.innerHTML = `
        <button class="btn btn-sm hover:bg-[#ff617b] hover:text-white">${data.category}</button>
        `
        categoryContainer.appendChild(categoriesDiv);
    });

}
loadCategories();