
import React, { useState, useContext, useRef } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';

import { MyContext } from '../context';

const Stage1 = () => {
    const textInput = useRef();
    const context = useContext(MyContext);
    const [error,setError ] = useState([false,''])

    const handleSubmit = (e) => {
        e.preventDefault();
        const value = textInput.current.value;
        const validate = validateInput(value);

        if(validate) {
            setError([false,'']);
            context.addPlayer(value)
            textInput.current.value = ''
        }
    }

    const validateInput = (value) => {
        if(value === '') {
            setError([true, 'Sorry, you need to add something']);
            return false;
        }
        if(value.length <= 2) {
            setError([true, 'Sorry, you need 3 char at least']);
            return false;
        }
        return true;
    }

  return (
    <>
    <Form onSubmit={handleSubmit} className="mt-4">
        <Form.Group>
         <Form.Control
            type="text"
            placeholder="Add player name"
            name="player"
            ref={textInput}
          />
        </Form.Group>

        { error[0] ?
        <Alert variant="danger">
            {error[1]}
        </Alert>
           :null}

        <Button className="miami" variant="primary" type="submit">
            Add player
        </Button>
        {
           context.state.players && context.state.players.length > 0 ?
           <>
           <hr/>
           <div>
               <ul className="list-group">
                { context.state.players.map((item, idx) => (
                    <li key={idx}>
                        {item}
                    </li>
                ))

                }
               </ul>
           </div>
           </>
           : null
        }
    </Form>

    </>
  );
}

export default Stage1;
