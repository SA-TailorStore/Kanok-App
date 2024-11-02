export type IDesign = {
    design_id: number;
    type: "เสื้อ" | "กางเกง" | "กระโปรง" | "เดรส";
    design_url: string;
    created_by?: number; // อาจไม่ต้องมีแล้วเพราะร้านค้าเป็นคน update เสื้อ
    created_at?: Date;
};
