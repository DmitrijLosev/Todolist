import Button, {ButtonOwnProps} from "@mui/material/Button"
import React from "react"


type SuperButtonPropsType = ButtonOwnProps & {
    onClick:()=>void
}

export const SuperMUIButton: React.FC<SuperButtonPropsType> = React.memo(({onClick,...restProps}) => {

        return (
            <Button
               onClick={onClick}
                {...restProps} >
            </Button>
        )
    }
)

