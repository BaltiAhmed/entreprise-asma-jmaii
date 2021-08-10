import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { Container, Row, Col } from "react-bootstrap";
import { Authcontext } from "../context/auth-context";
import UpdateIcon from "@material-ui/icons/Update";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import ErrorModel from "../models/error-models";
import SuccessModel from "../models/success-models";
import TablePagination from "@material-ui/core/TablePagination";
import { Link } from "react-router-dom";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",

    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

export default function ListOffre() {
  const classes = useStyles();

  const [list, setList] = useState();
  const [image, setImage] = useState();
  const [error, seterror] = useState(null);
  const [success, setsuccess] = useState(null);
  const [page, setPage] = useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const auth = useContext(Authcontext);

  useEffect(() => {
    const sendRequest = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/offre/user/${auth.userId}`
        );

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setList(responseData.offre);
        setImage(responseData.image);
      } catch (err) {
        seterror(err.message);
      }
    };

    sendRequest();
  }, []);

  console.log(list);
  console.log(image);

  return (
    <div style={{ marginTop: "5%" }}>
      <Container>
        <Row>
          <Col></Col>
          <Col xs={8}>
            <ErrorModel error={error} />
            <SuccessModel success={success} />
            <List className={classes.root}>
              {list &&
                list.slice(page * 10, page * 10 + 10).map((item, index) => (
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar
                        alt="Remy Sharp"
                        src={`http://localhost:5000/${image}`}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.titre}
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                          >
                            {item.Ddebut} jusqu'à {item.Dfin}
                          </Typography>
                          <br></br>
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                          >
                            {item.mission}
                          </Typography>
                          <br></br>
                          {item.description}
                          <Divider variant="inset" component="li" />
                          {item.Aprincipale}
                        </React.Fragment>
                      }
                    />
                    <Link to={`/liste-condidat/${item._id}`}>
                      <FormatListBulletedIcon
                        style={{ color: "#42a5f5" }}
                        fontSize="large"
                      />
                    </Link>
                    <Link to={`/update-offre/${item._id}`}>
                      <UpdateIcon style={{ color: "green" }} fontSize="large" />
                    </Link>

                    <DeleteForeverIcon
                      color="secondary"
                      fontSize="large"
                      onClick={async (event) => {
                        try {
                          let response = await fetch(
                            `http://localhost:5000/api/offre/${item._id}`,
                            {
                              method: "DELETE",
                              headers: {
                                "Content-Type": "application/json",
                              },
                            }
                          );
                          let responsedata = await response.json();
                          if (!response.ok) {
                            throw new Error(responsedata.message);
                          }
                          setList(list.filter((el) => el._id !== item._id));
                          setsuccess("Offre bien suprimer");
                        } catch (err) {
                          console.log(err);
                          seterror(err.message || "il y a un probleme");
                        }
                      }}
                    />
                  </ListItem>
                ))}
              <Divider variant="inset" component="li" />
            </List>
            <TablePagination
              rowsPerPageOptions={[10]}
              component="div"
              count={list && list.length}
              rowsPerPage={10}
              page={page}
              onChangePage={handleChangePage}
            />
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
}
