import { useEffect, useState } from "react";
import { BirdList } from '../components/birds/BirdList'


export function BirdPage () {

    return (
        <div className="flex justify-center body-page">
            <BirdList />
        </div>
    )
}
