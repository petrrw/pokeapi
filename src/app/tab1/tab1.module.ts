import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { PokemonListComponent } from '../components/pokemon-list/pokemon-list.component';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { SearchComponent } from "../components/search/search.component";

@NgModule({
    declarations: [Tab1Page, PokemonListComponent, SearchComponent],
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ExploreContainerComponentModule,
        Tab1PageRoutingModule,
    ]
})
export class Tab1PageModule {}
