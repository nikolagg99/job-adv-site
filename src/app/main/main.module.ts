import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { AllAdvertisementsComponent } from "./all-advertisements/all-advertisements.component";
import { CreateAdvertisementComponent } from "./create-advertisement/create-advertisement.component";
import { SingleAdvertisementComponent } from "./single-advertisement/single-advertisement.component";
import { MainComponent } from './main.component';
import { RouterModule } from "@angular/router";
import { MainRoutingModule } from "./main-routing.module";
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { MyApplicationsComponent } from './my-applications/my-applications.component';
import { MyAdvertisementsComponent } from './my-advertisements/my-advertisements.component';
import { UpdateAdvertisementComponent } from './update-advertisement/update-advertisement.component';
import { CandidatesComponent } from './candidates/candidates.component';
import { SingleCandidateComponent } from './single-candidate/single-candidate.component';

@NgModule({
    imports: [
        HttpClientModule,
        ReactiveFormsModule,
        CommonModule,
        RouterModule,
        MainRoutingModule
    ],
    declarations: [
        AllAdvertisementsComponent,
        SingleAdvertisementComponent,
        CreateAdvertisementComponent,
        MainComponent,
        UpdateProfileComponent,
        MyApplicationsComponent,
        MyAdvertisementsComponent,
        UpdateAdvertisementComponent,
        CandidatesComponent,
        SingleCandidateComponent
    ]
})

export class MainModule {

}