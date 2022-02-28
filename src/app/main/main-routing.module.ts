import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AccessControlGuard } from "../guards/acces-control.guard";
import { AllAdvertisementsComponent } from "./all-advertisements/all-advertisements.component";
import { CreateAdvertisementComponent } from "./create-advertisement/create-advertisement.component";
import { MainComponent } from "./main.component";
import { MyAdvertisementsComponent } from "./my-advertisements/my-advertisements.component";
import { MyApplicationsComponent } from "./my-applications/my-applications.component";
import { UpdateAdvertisementComponent } from "./update-advertisement/update-advertisement.component";
import { UpdateProfileComponent } from "./update-profile/update-profile.component";
import { CandidatesComponent } from './candidates/candidates.component';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: 'advertisements',
                component: AllAdvertisementsComponent
            },
            {
                path: 'advertisement/create',
                component: CreateAdvertisementComponent,
                canActivate: [AccessControlGuard]
            },
            {
                path:'advertisement/update/:id',
                component: UpdateAdvertisementComponent,
                canActivate: [AccessControlGuard]
            },
            {
                path: 'update/:id',
                component: UpdateProfileComponent
            },
            {
                path: 'my-applications',
                component: MyApplicationsComponent
            },
            {
                path: 'my-advertisements',
                component: MyAdvertisementsComponent,
                canActivate: [AccessControlGuard]
            },
            {
                path: 'candidates',
                component: CandidatesComponent,
                canActivate: [AccessControlGuard]
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo:'advertisements'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class MainRoutingModule {

}