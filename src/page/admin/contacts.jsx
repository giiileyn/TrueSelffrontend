import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress,
} from "@mui/material";
import { notifyError, notifySuccess } from "../../../utils/helpers";
import AxiosInstance from "../../../utils/AxiosInstance";
import ContactModal from "../../components/admin/modals/Contact.modal";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [contactToEdit, setContactToEdit] = useState(null);

  const fetchContacts = async () => {
    setIsLoading(true);
    try {
      const response = await AxiosInstance.get("/contacts").then((response) => {
        if (response.status === 200) {
          setContacts(response.data.data);
        }
      });
    } catch (error) {
      notifyError("Failed to fetch contacts");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="px-3 mt-8">
      <div className="flex justify-between">
        <h1 className="font-bold font-serif" style={{ fontSize: "30px" }}>
          List of Contacts
        </h1>
        <p style={{ fontSize: "13.5px" }}>
          <span className="text-blue-500 hover:underline">Home</span> /
          <span className="text-gray-500"> Contacts</span>
        </p>
      </div>

      <div className="mt-6">
        {isLoading ? (
          <div className="flex justify-center items-center">
            <CircularProgress />
          </div>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>
                    <strong>Name</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Email</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Phone</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Subject</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Message</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Status</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Actions</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {contacts.length > 0 ? (
                  contacts.map((contact, index) => (
                    <TableRow key={contact._id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{contact.name}</TableCell>
                      <TableCell>{contact.email}</TableCell>
                      <TableCell>{contact.phone}</TableCell>
                      <TableCell>{contact.subject}</TableCell>
                      <TableCell>{contact.message}</TableCell>
                      <TableCell>{contact.status}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          onClick={() => console.log(`View ${contact.name}`)}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} align="center">
                      No contacts found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </div>
  );
};

export default Contacts;
