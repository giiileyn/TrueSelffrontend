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
  Box,
  Pagination,
} from "@mui/material";
import { notifyError } from "../../../utils/helpers";
import AxiosInstance from "../../../utils/AxiosInstance";
import ContactModal from "../../components/admin/modals/Contact.modal";
import { Link } from "react-router-dom";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [contactToEdit, setContactToEdit] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Pagination state
  const [page, setPage] = useState(1);
  const rowsPerPage = 10; // Set number of rows per page

  const fetchContacts = async () => {
    setIsLoading(true);
    try {
      const response = await AxiosInstance.get("/contacts");
      if (response.status === 200) {
        setContacts(response.data.data);
      }
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

  const openEditModal = (contact) => {
    setContactToEdit(contact);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setContactToEdit(null);
  };

  // Handle pagination change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Get current page's data
  const paginatedContacts = contacts.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <div className="px-3 mt-8">
      <div className="flex justify-between">
        <h1 className="font-bold font-serif" style={{ fontSize: "30px" }}>
          List of Contacts
        </h1>
        <p style={{ fontSize: "13.5px" }}>
          <Link to="/admin">
            <span className="text-blue-500 hover:underline">Home</span> /
          </Link>
          <span className="text-gray-500"> Contacts</span>
        </p>
      </div>

      {isModalOpen && (
        <Box position="fixed" top="0" left="0" right="0" bottom="0" zIndex="50">
          <ContactModal
            contactToEdit={contactToEdit}
            isEditing={isEditing}
            onClose={closeModal}
            onContactCreated={fetchContacts}
          />
        </Box>
      )}

      <div className="mt-6">
        {isLoading ? (
          <div className="flex justify-center items-center">
            <CircularProgress />
          </div>
        ) : (
          <>
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
                  {paginatedContacts.length > 0 ? (
                    paginatedContacts.map((contact, index) => (
                      <TableRow
                        key={contact._id}
                        className="even:bg-gray-50 odd:bg-white hover:bg-gray-100 transition-all"
                      >
                        <TableCell>
                          {(page - 1) * rowsPerPage + index + 1}
                        </TableCell>
                        <TableCell>{contact.name}</TableCell>
                        <TableCell>{contact.email}</TableCell>
                        <TableCell>{contact.phone}</TableCell>
                        <TableCell>{contact.subject}</TableCell>
                        <TableCell>{contact.message}</TableCell>
                        <TableCell>
                          {contact.status.charAt(0).toUpperCase() +
                            contact.status.slice(1)}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            color="secondary"
                            size="small"
                            onClick={() => openEditModal(contact)}
                            style={{ marginLeft: "5px" }}
                          >
                            Edit
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

            {/* Pagination Component */}
            <div className="flex justify-center mt-4">
              <Pagination
                count={Math.ceil(contacts.length / rowsPerPage)}
                page={page}
                onChange={handleChangePage}
                color="secondary"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Contacts;
