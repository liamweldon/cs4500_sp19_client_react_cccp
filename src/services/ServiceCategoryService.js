export default class ServiceCategoryService {
    static instance = null;
    static getInstance() {
        if(ServiceCategoryService.instance === null) {
            ServiceCategoryService.instance = new ServiceCategoryService()
        }
        return this.instance
    }
    findServiceCategoryById = categoryId =>
        fetch(`http://localhost:8080/api/service-categories/${categoryId}`)
            .then(response => response.json())
    findAllServiceCategories = () =>
        fetch("http://localhost:8080/api/service-categories")
            .then(response => response.json())
}
