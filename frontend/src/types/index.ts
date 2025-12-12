// Trick categories
export enum ECategory {
    GRIND = "grind",
    FLIP = "flip",
    SLIDE = "slide"
  }
  
  // Trick object
  export interface ITrick {
    id: number;
    name: string;
    category: ECategory;
    difficulty: number;
    done: boolean;
  }
  
  // Response from GET /api/tricks
  export interface IGetTricksResponse {
    tricks: ITrick[];  // always defined
    error?: boolean;
  }
  
  // Response from PUT /api/tricks/:id
  export interface IUpdateTrick {
    trick: ITrick;
  }
  