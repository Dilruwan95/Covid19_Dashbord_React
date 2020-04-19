import React, { Component } from "react";
import axios from "axios";
import { Grid, Segment, Menu, Header, Icon } from "semantic-ui-react";

export default class Dashbord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      res: {
        update_date_time: "",
        local_new_cases: " ",
        local_total_cases: " ",
        local_total_number_of_individuals_in_hospitals: "",
        local_deaths: "",
        local_new_deaths: "",
        local_recovered: "",
        local_active_cases: "",
        global_new_cases: "",
        global_total_cases: "",
        global_deaths: "",
        global_new_deaths: "",
        global_recovered: "",
        hospital_data: [],
      },
    };
  }

  componentDidMount() {
    axios
      .get("https://www.hpb.health.gov.lk/api/get-current-statistical")
      .then((response) => {
        console.log(response.data.data);
        this.setState({ res: response.data.data });
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <Menu color="black" inverted widths={16} fixed="top" fluid vertical>
          <Header size="huge" inverted color="white" floated="left">
            COVID-19 Dashbord
          </Header>
          <Header as="h3" inverted color="white" floated="left">
            Last Update:{this.state.res.update_date_time}
          </Header>
        </Menu>

        <br></br>
        <br></br>

        <Header as="h1" icon textAlign="center">
          <Header.Content>Local Details</Header.Content>
        </Header>

        <Grid columns={2} container divided stackable>
          <Grid.Row>
            <Grid.Column>
              <Segment inverted color="yellow">
                <Icon name="hospital" size="big" />
                <Header as="h1">{this.state.res.local_total_cases}</Header>
                <Header as="h3"> තහවුරු කරනලද රෝගීන් සංඛ්‍යාව</Header>
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment inverted color="violet" secondary>
                <Icon name="bed" size="big" />
                <Header as="h1">{this.state.res.local_active_cases}</Header>
                <Header as="h3"> ප්‍රතිකාර ලබන රෝගීන් සංඛ්‍යාව </Header>
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Segment inverted color="blue">
                <Icon name="ambulance" size="big" />
                <Header as="h1">{this.state.res.local_new_cases}</Header>
                <Header as="h3"> නව රෝගීන් සංඛ්‍යාව</Header>
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment inverted color="orange">
                <Icon name="hospital outline" size="big" />
                <Header as="h1">
                  {
                    this.state.res
                      .local_total_number_of_individuals_in_hospitals
                  }
                </Header>
                <Header as="h3">
                  දැනට රෝහල්වල විමර්ශන යටතේ සිටින පුද්ගලයින්
                </Header>
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Segment inverted color="green">
                <Icon name="user" size="big" />
                <Header as="h1">{this.state.res.local_recovered} </Header>
                <Header as="h3"> සුවය ලබා පිටව ගිය සංඛ්‍යාව</Header>
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment inverted color="red">
                <Icon name="bed" size="big" />
                <Header as="h1">{this.state.res.local_deaths}</Header>
                <Header as="h3"> මරණ සංඛ්‍යාව </Header>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <br></br>
        <br></br>

        <Header as="h1" icon textAlign="center">
          <Header.Content>Global Details</Header.Content>
        </Header>

        <Grid columns={2} container divided stackable>
          <Grid.Row>
            <Grid.Column>
              <Segment inverted color="yellow">
                <Icon name="hospital" size="big" />
                <Header as="h1">{this.state.res.global_total_cases}</Header>
                <Header as="h3"> තහවුරු කරනලද රෝගීන් සංඛ්‍යාව</Header>
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment inverted color="blue">
                <Icon name="ambulance" size="big" />
                <Header as="h1">{this.state.res.global_new_cases}</Header>
                <Header as="h3"> නව රෝගීන් සංඛ්‍යාව</Header>
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Segment inverted color="green">
                <Icon name="user" size="big" />
                <Header as="h1">{this.state.res.global_recovered}</Header>
                <Header as="h3"> සුවය ලබා පිටව ගිය සංඛ්‍යාව</Header>
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment inverted color="red">
                <Icon name="bed" size="big" />
                <Header as="h1">{this.state.res.global_deaths}</Header>
                <Header as="h3"> මරණ සංඛ්‍යාව </Header>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <br></br>
        <br></br>

        <Header as="h1" icon textAlign="center">
          <Header.Content>Current Hospital Details In Sri Lanka</Header.Content>
        </Header>
        <div>
          {this.state.res.hospital_data.map((e) => {
            return (
              <Grid textAlign="center" columns={3} key={e.id}>
                <Grid.Row>
                  <Grid.Column>
                    <Menu fluid vertical>
                      <Menu.Item className="header">
                        {e.hospital.name_si}
                      </Menu.Item>
                      <Menu.Item>
                        රෝගීන් සංඛ්‍යාව(ප්‍රතිකාර ලබන/සැක සහිත):
                        <Header as="h3">{e.cumulative_total}</Header>
                      </Menu.Item>
                      <Menu.Item>{e.created_at}</Menu.Item>
                    </Menu>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            );
          })}
        </div>
      </div>
    );
  }
}
