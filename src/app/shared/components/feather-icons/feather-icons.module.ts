import { NgModule } from "@angular/core";
import { FeatherIconsComponent } from "./feather-icons.component";

import { FeatherModule } from "angular-feather";
import { allIcons } from "angular-feather/icons";

@NgModule({
  imports: [FeatherModule.pick(allIcons)],
  exports: [FeatherIconsComponent, FeatherModule],
  declarations: [FeatherIconsComponent],
})
export class FeatherIconsModule {}
