import React, {Component} from 'react';

import reddit from './../../pics/reddit.png';
import './Card.scss';

class Card extends Component {
    render(){
        const { card, onClickHandler } = this.props;
        return (
            <div className="card">
                {<img onClick={onClickHandler} className={card.open ? 'card-open' : 'card-closed'} src={card.open ? card.image : reddit} alt={card.name} />}
            </div>
        )
    }
}

export default Card;