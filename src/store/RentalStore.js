import { makeAutoObservable } from "mobx"

export default class RentalStore {
    constructor() {
        this._visitors = []
        this._packages = []
        this._computers = []
        this._rentals = []

        this._selectedVisitor = {}
        this._selectedPackage = {}
        this._selectedComputer = {}
        this._selectedRental = {}

        makeAutoObservable(this)
        this.loadCart();
    }

    setVisitors(visitors) {
        this._visitors = visitors
    }
    setPackages(packages) {
        this._packages = packages
    }
    setComputers(computers) {
        this._computers = computers
    }
    setRentals(rentals) {
        this._rentals = rentals
    }
    
    setSelectedVisitor(visitor) {
        this._selectedVisitor = visitor
        this.saveCard()
    }
    setSelectedPackage(packageService) {
        this._selectedPackage = packageService
        this.saveCard()
    }
    setSelectedComputer(computer) {
        this._selectedComputer = computer
        this.saveCard()
    }
    setSelectedRental(rental) {
        this._selectedRental = rental
    }


    get visitors() {
        return this._visitors
    }
    get packages() {
        return this._packages
    }
    get computers() {
        return this._computers
    }
    get rentals() {
        return this._rentals
    }

    get selectedVisitor() {
        return this._selectedVisitor
    }
    get selectedComputer() {
        return this._selectedComputer
    }
    get selectedPackage() {
        return this._selectedPackage
    }
    get selectedRental() {
        return this._selectedRental
    }

    loadCart() {
        const saved = localStorage.getItem('rentalCart')
        if(saved){
            const rental = JSON.parse(saved)
            this._selectedComputer = rental.computer
            this._selectedPackage = rental.packageService
            this._selectedVisitor = rental.visitor
        }
    }

    saveCard() {
        const rental = {
            computer: this._selectedComputer,
            packageService: this._selectedPackage,
            visitor: this._selectedVisitor
        }
        localStorage.setItem('rentalCart', JSON.stringify(rental))
    }
}