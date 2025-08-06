"use client";

import { FixedSizeGrid as Grid } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { ListItem } from "./list-item";
import { XtreamPreview } from "@/domain/xtream";

interface VirtualListProps {
  items: XtreamPreview[];
  columnCount?: number;
  itemHeight?: number;
}

export function VirtualList({ items, columnCount = 6, itemHeight = 300 }: VirtualListProps) {
  const rowCount = Math.ceil(items.length / columnCount);

  return (
    <div className="h-screen">
      <AutoSizer>
        {({ height, width }) => (
          <Grid
            columnCount={columnCount}
            columnWidth={width / columnCount}
            height={height}
            rowCount={rowCount}
            rowHeight={itemHeight}
            width={width}
          >
            {({ columnIndex, rowIndex, style }) => {
              const itemIndex = rowIndex * columnCount + columnIndex;
              if (itemIndex >= items.length) return null;
              return (
                <div style={style}>
                  <ListItem item={items[itemIndex]} />
                </div>
              );
            }}
          </Grid>
        )}
      </AutoSizer>
    </div>
  );
}
