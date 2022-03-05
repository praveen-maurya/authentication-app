import { PatientForm } from "../drawer/PatientForm"
import { Page2 } from "../drawer/Page2"
import { Page3 } from "../drawer/Page3"
import { Home } from "../home/home"

export const renderPage = (navId) => {
    switch(navId) {
        case 'home':
            return <Home />
        case 'patientForm':
            return <PatientForm />
        case 'page2':
            return <Page2 />
        case 'page3':
            return <Page3 />
        default:
            return 'Unknow step';
    }
}