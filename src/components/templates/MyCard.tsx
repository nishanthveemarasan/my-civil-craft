import React from "react";
import { MyCardProps } from "@/types/template";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
const MyCard: React.FC<MyCardProps> = ({ children, cardCalss = "", contentClass = "", header=null }) => {
    return <Card className={cardCalss}>
        <CardHeader>
            {header}
        </CardHeader>
        <CardContent className={contentClass}>
            {children}
        </CardContent>
    </Card>
}
export default MyCard;