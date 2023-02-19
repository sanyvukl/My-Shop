import "./info-box.styles.scss";
import { Card } from "../import.components";

const InfoBox = ({ card, title, count, icon }) => {
    return (
        <div className="info-box">
            <Card cardClass={card}>
                <h4>{title}</h4>
                <span>
                    <h3>{count}</h3>
                    {icon}
                </span>
            </Card>
        </div>
    )
}

export default InfoBox