import { TileItemComponent } from "./tile-item/tile-item.component";
import { TileTwoBottomColumnComponent } from "./tile-two-bottom-column/tile-two-bottom-column.component";
import { TileTwoTopColumnComponent } from "./tile-two-top-column/tile-two-top-column.component";
export const components: any[] = [
	TileItemComponent,
    TileTwoBottomColumnComponent,
    TileTwoTopColumnComponent,
];
export * from '@features/tile-grid/components/tile-item/tile-item.component';
export * from '@features/tile-grid/components/tile-two-bottom-column/tile-two-bottom-column.component';
export * from '@features/tile-grid/components/tile-two-top-column/tile-two-top-column.component';