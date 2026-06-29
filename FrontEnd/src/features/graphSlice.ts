import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


interface Graph { GraphType: string; range: string | null;}

const initialState: Graph = {GraphType: "line", range: null};

const graphInfo = createSlice({ name: "graphInfo", initialState, reducers: {
    graphinfo: (state, action: PayloadAction<Graph>) => {
      state.GraphType = action.payload.GraphType;
      state.range = action.payload.range;
      //go to saga to handle login
    },

    
   

   

  },
});

export const { graphinfo,  } =graphInfo.actions;
export default graphInfo.reducer;