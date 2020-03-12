import React from 'react';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';
import Info from './Info';
import Entity from './Entity';

const Container = styled.div`
    background: ${props => props.theme.palette.background.paper};
    display: flex;
    align-items: center;
`;

const EntityContainer = styled(Grid)`
    position: relative;
    padding: 56px 24px;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    overflow: auto;
`;

class Home extends React.Component {
    constructor(props) {
        super(props);
        const { data: user } = props;
        this.state = {
            user
        };
    }

    render() {
        const { user } = this.state;

        return (
            <Container>
                <Grid container>
                    <Grid item sm={6}>
                        <Info data={user} />
                    </Grid>
                    <EntityContainer item sm={6}>
                        <Entity label="education" data={user.education} />
                        <Entity label="work" data={user.work} />
                        <Entity label="achivement" data={user.achivement} />
                    </EntityContainer>
                </Grid>
            </Container>
        );
    }
}

export default Home;
