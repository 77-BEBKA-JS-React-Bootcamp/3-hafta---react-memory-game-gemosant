import React, { Component } from 'react'

import { shuffle } from 'lodash';

import Card from '../Card/Card';

import './Game.scss';

import artistdayi from './../../pics/artist-dayi.jpg';
import babyyoda from './../../pics/baby-yoda.png';
import pikachu from './../../pics/pikachu.png';
import basimizbelayagirecek from './../../pics/basimiz-belaya-girecek.jpg';
import cat from './../../pics/cat.jpg';
import doge from './../../pics/doge.png';
import stonks from './../../pics/stonks.png';
import narutoguy from './../../pics/naruto-guy.jpg';
import { withRouter, Redirect } from 'react-router-dom';

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: [
                { name: 'artistdayi', open: false, id: 1, image: artistdayi, isCompleted: false },
                { name: 'babyyoda', open: false, id: 2, image: babyyoda, isCompleted: false },
                { name: 'pikachu', open: false, id: 3, image: pikachu, isCompleted: false },
                { name: 'basimizbelayagirecek', open: false, id: 4, image: basimizbelayagirecek, isCompleted: false },
                { name: 'cat', open: false, id: 5, image: cat, isCompleted: false },
                { name: 'doge', open: false, id: 6, image: doge, isCompleted: false },
                { name: 'stonks', open: false, id: 7, image: stonks, isCompleted: false },
                { name: 'narutoguy', open: false, id: 8, image: narutoguy, isCompleted: false },
                { name: 'artistdayi', open: false, id: 9, image: artistdayi, isCompleted: false },
                { name: 'babyyoda', open: false, id: 10, image: babyyoda, isCompleted: false },
                { name: 'pikachu', open: false, id: 11, image: pikachu, isCompleted: false },
                { name: 'basimizbelayagirecek', open: false, id: 12, image: basimizbelayagirecek, isCompleted: false },
                { name: 'cat', open: false, id: 13, image: cat, isCompleted: false },
                { name: 'doge', open: false, id: 14, image: doge, isCompleted: false },
                { name: 'stonks', open: false, id: 15, image: stonks, isCompleted: false },
                { name: 'narutoguy', open: false, id: 16, image: narutoguy, isCompleted: false },
            ],
            shuffledCards: [],
            matchedCards: [],
            flippedCards: [],
            score: 10000
        }
    }

    componentDidMount() {
        this.setState({ shuffledCards: shuffle(this.state.cards) })
    }

    onClickHandler = (card, index) => {
        if (this.state.flippedCards.length === 2) {
            setTimeout(() => {
                this.check();
            }, 500);
        } else {
            let flippedCards = this.state.flippedCards;
            let shuffledCards = this.state.shuffledCards;
            shuffledCards[index].open = true;
            flippedCards.push(card);
            this.setState({
                flippedCards,
                shuffledCards
            })
            if (this.state.flippedCards.length === 2) {
                setTimeout(() => {
                    this.check();
                }, 500);
            }
        }
    }

    check() {
        let shuffledCards = this.state.shuffledCards;
        let matchedCards = this.state.matchedCards;

        if (this.state.flippedCards[0].name === this.state.flippedCards[1].name) {
            shuffledCards.find(item => item.id === this.state.flippedCards[0].id).isCompleted = true;
            shuffledCards.find(item => item.id === this.state.flippedCards[1].id).isCompleted = true;
            matchedCards.push(this.state.flippedCards[0].id, this.state.flippedCards[1].id)
        } else {
            shuffledCards.find(item => item.id === this.state.flippedCards[0].id).open = false;
            shuffledCards.find(item => item.id === this.state.flippedCards[1].id).open = false;
            this.setState({ score: this.state.score - 1 })
        }

        this.setState({
            flippedCards: [],
            matchedCards: matchedCards
        })

    }

    render() {
        if(this.state.matchedCards.length === 16 || this.state.score === 0){
            const newTo = { 
                pathname: "", 
                userName: this.props.location.userName,
                score: this.state.score
              };
            this.state.matchedCards.length === 16 ? newTo.pathname = "/result" : newTo.pathname = "/result"
            return <Redirect to={newTo} />
        }
        return (
            <>
                <p className="game-info">Hi {this.props.location.name}!</p>
                <p className="game-info">You have {this.state.score} change left!</p>
                <div className="card-container">
                    {this.state.shuffledCards.map((card, index) =>
                        <Card
                            key={index}
                            onClickHandler={() => this.state.flippedCards.length === 2 ?
                                null :
                                this.onClickHandler(card, index)}
                            card={card} />
                    )}
                </div>
            </>
        )
    }
}

export default withRouter(Game);