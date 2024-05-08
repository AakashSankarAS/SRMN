import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import { useGetAll } from "../../hooks/useGetAll";
import { useEditWithId } from "../../hooks/useEditWithId";
import { useDeleteWithId } from "../../hooks/useDeleteWithId";
import { Card, CardHeader, Container, Table, Row, Button } from "reactstrap";
import PreviewModal from "../modals/PreviewModal";
import CivilMarriageEdit from "../../pages/end_users/civil_marriage/CivilMarriageEdit";
import SingleStatusEdit from "../../pages/end_users/single_status_letter/SingleStatusEdit";
import LicensingAChurchEdit from "../../pages/church_admin/licensing_a_church/LicensingAChurchEdit";
import RetrievalEdit from "../../pages/end_users/lost_certificate_retrieval/RetrievalEdit";
import MarriageView from "../../pages/end_users/civil_marriage/MarriageView";
import SingleStatusView from "../../pages/end_users/single_status_letter/SingleStatusView";
import LicensingAChurchView from "../../pages/church_admin/licensing_a_church/LicensingAChurchView";
import RetrievalView from "../../pages/end_users/lost_certificate_retrieval/RetreivalView";
import DocumentPreview from "../modals/DocumentPreview";
import MarriagePdf from "../../pages/end_users/civil_marriage/MarriagePdf";
import SingleStausCertificate from "../../pages/end_users/single_status_letter/SingleStausCertificate";
import FileDownloader from "../../pages/end_users/lost_certificate_retrieval/FileDownloader";
import LicensePDF from "nmrs/pages/church_admin/licensing_a_church/LicensePDF";
import LicenseRenewalEdit from "nmrs/pages/church_admin/license_renewal/LicenseRenewalEdit";
import LicenseRenewalView from "nmrs/pages/church_admin/license_renewal/LicenseRenewalView";
import LicenseRenewalPDF from "nmrs/pages/church_admin/license_renewal/LicenseRenewalPDF";

import usrb from "../../themes/Logo.png";
import TextInput from "components/Forms/TextInput";
import MiniModal from "../modals/MiniModal";
import { toast } from "react-toastify";

export default function StatusTracking({ btnText }) {
  const [mouse, handleMouse] = useState("0");
  const location = useLocation();
  const navigate = useNavigate();
  const routeName = location.pathname.split("/")[1];
  const dbName = routeName;
  const data = useGetAll({ dbName });
  const [modal, setModal] = useState("");
  const [editedData, editWithKey] = useEditWithId({ dbName });
  const deleteWithKey = useDeleteWithId({ dbName });
  const [OTP, setOTP] = useState({
    visible: "",
    otp: "",
  });

  const [OTPNumber, setOTPNumber] = useState();
  const [status, setStatus] = useState([]);

  const [getDocument, setDocument] = useState();
  useEffect(() => {
    if (editedData) {
      setStatus(editedData);
    } else {
      setStatus(data);
    }
  }, [data, editedData]);

  const downloadDoc = async (reqID) => {
    const fetchData = await fetch(
      `https://zoho-sign-fvn2.onrender.com/getdocument?id=${reqID}`
    )
      .then((res) => res.json())
      .then((data) => data.pdf);

    const downloadLink = document.createElement("a");

    downloadLink.href = "data:application/pdf;base64," + fetchData;

    downloadLink.download = "MarriageCertificate.pdf";

    downloadLink.click();
  };

  const verification = async () => {
    let newOTP = Math.floor(Math.random() * 1000000);
    setOTPNumber(newOTP);

    const options = {
      method: "POST",
      body: new URLSearchParams({
        to: "aakashsankar412@gmail.com",
        subject: "One Time Password Verification",
        html: `
        <html>
  <head>
    <style>
      .otp {
       text-align:center;
      }
      .inner{
        border-radius:10px;
        border:2px solid black;
        padding:4px;
        margin-top:5px;
      }
    </style>
  </head>
  <body>
  <div class="otp"><img title="logo" src=${"https://ursb.go.ug/assets/images/ug/Logo_Colour-01.jpg"} alt="ursb" width="30%" /></div>
  <h4 class="otp">This is the OTP to view and download your marriage certificate</h4>
   <h3 class="otp"><span class="inner">${newOTP}<span></h3>
  </body>
</html>`,
      }),
    };
    const verify = await fetch(
      `https://zoho-sign-fvn2.onrender.com/sendmail`,
      options
    );
  };

  const handleDelete = (id) => {
    const newData = status.filter((elem) => elem.id !== id);
    Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "Once deleted, you won't be able to recover this data!",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteWithKey(id);
        setStatus(newData);
        showSuccessAlert(id);
      }
    });
  };

  const showSuccessAlert = () => {
    Swal.fire({
      icon: "success",
      title: "Success!",
      text: "Application Successfully Removed",
      confirmButtonText: "OK",
    });
  };

  const editLabel =
    (routeName === "civilmarriage" && "Marriage Registration Form Edit") ||
    (routeName === "singlestatusletter" && "Single Status Letter Form Edit") ||
    (routeName === "churchlicensing" && "Church License Form Edit") ||
    (routeName === "LicenseRenewal" && "License Renewal Form Edit") ||
    (routeName === "lostcertificateretrieval" &&
      "Lost Certificate Retrieval Form Edit");

  const ViewLabel =
    (routeName === "civilmarriage" && "Marriage Registration Form Edit") ||
    (routeName === "singlestatusletter" && "Single Status Letter Form Edit") ||
    (routeName === "churchlicensing" && "Church License Form Edit") ||
    (routeName === "LicenseRenewal" && "License Renewal Form Edit") ||
    (routeName === "lostcertificateretrieval" &&
      "Lost Certificate Retrieval Form Edit");
  return (
    <Container fluid className="overflow-hidden">
      {/* <Row>
        <Button
          onClick={() => navigate(location.pathname + "/form")}
          className="bg-usrb ml-3 text-white"
        >
          <span className="font-weight-bolder ">+</span> {btnText}
        </Button>
      </Row> */}
      {/* Table */}
      <Row className="mt-4">
        <div className="col">
          <Card className="shadow">
            <CardHeader className="border-0">
              <h3 className="mb-0">Status Of Applications</h3>
            </CardHeader>

            <Table
              className="align-items-center table-bordered table-hover "
              responsive
            >
              <thead className="thead-light">
                <tr>
                  <th
                    className="text-center text-sm text-usrb-light font-weight-bolder"
                    scope="col"
                  >
                    S.No
                  </th>
                  <th
                    className="text-center text-md text-usrb-light font-weight-bolder "
                    scope="col"
                  >
                    Applicant Name
                  </th>
                  <th
                    className="text-center text-md text-usrb-light font-weight-bolder "
                    scope="col"
                  >
                    Date Of Application
                  </th>
                  <th
                    className="text-center text-md text-usrb-light font-weight-bolder "
                    scope="col"
                  >
                    Status
                  </th>
                  <th
                    className="text-center text-md text-usrb-light font-weight-bolder "
                    scope="col"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {!status.length ? (
                  <tr>
                    <td colSpan="5" className="text-center">
                      <h3>No Data Found</h3>
                    </td>
                  </tr>
                ) : (
                  status.map((elem, index) => {
                    // console.log(elem, "dbdb")
                    return (
                      <tr key={elem.id}>
                        <td className="text-md text-dark text-center">
                          {index + 1}
                        </td>
                        <td className="text-md text-dark text-center">
                          {elem.gName || elem.cOfficialName || elem.aName}
                        </td>
                        <td className="text-md text-dark text-center">
                          {elem.doA}
                        </td>
                        <td>
                          <div
                            className={
                              (elem.status === "Applied" &&
                                "text-center text-white p-2 rounded-pill bg-usrb") ||
                              (elem.status === "Approved" &&
                                "text-center text-white p-2 rounded-pill bg-success") ||
                              (elem.status === "On Hold" &&
                                "text-center text-white p-2 rounded-pill bg-warning") ||
                              (elem.status === "Rejected" &&
                                "text-center text-white p-2 rounded-pill bg-danger")
                            }
                          >
                            {elem.status}
                          </div>
                        </td>
                        <td className="text-md text-dark  align-items-center text-center">
                          {elem.status === "Rejected" && (
                            <p className="font-weight-bold">
                              Approval Rejected
                            </p>
                          )}
                          {elem.status === "On Hold" && (
                            <p className="text-md font-weight-bold">
                              Held In Review
                            </p>
                          )}

                          {elem.status === "Applied" && (
                            <>
                              <button
                                className="px-3 border-0 rounded-pill bg-usrb shadow-lg ml-1 py-1"
                                onMouseEnter={() => handleMouse(`${elem.id}1`)}
                                onMouseLeave={() => handleMouse("0")}
                                onClick={() => setModal(`${elem.id}1`)}
                              >
                                <i className="fa-solid text-white fa-pen-to-square m-0"></i>
                                <div
                                  className={
                                    mouse === `${elem.id}1`
                                      ? "tooltip tooltip-inner show"
                                      : "tooltip "
                                  }
                                >
                                  Edit
                                  {modal === `${elem.id}1` && (
                                    <PreviewModal
                                      modalHeader={editLabel}
                                      modal={modal === `${elem.id}1` && true}
                                      setModal={setModal}
                                    >
                                      {routeName === "civilmarriage" && (
                                        <CivilMarriageEdit
                                          setModal={setModal}
                                          id={elem.id}
                                          editWithKey={editWithKey}
                                          editedData={editedData}
                                        />
                                      )}
                                      {routeName === "singlestatusletter" && (
                                        <SingleStatusEdit
                                          setModal={setModal}
                                          id={elem.id}
                                          editWithKey={editWithKey}
                                          editedData={editedData}
                                        />
                                      )}

                                      {routeName === "churchlicensing" && (
                                        <LicensingAChurchEdit
                                          setModal={setModal}
                                          id={elem.id}
                                          editWithKey={editWithKey}
                                        />
                                      )}

                                      {routeName === "LicenseRenewal" && (
                                        <LicenseRenewalEdit
                                          setModal={setModal}
                                          id={elem.id}
                                          editWithKey={editWithKey}
                                        />
                                      )}
                                      {routeName ===
                                        "lostcertificateretrieval" && (
                                        <RetrievalEdit
                                          setModal={setModal}
                                          id={elem.id}
                                          editWithKey={editWithKey}
                                        />
                                      )}
                                    </PreviewModal>
                                  )}
                                </div>
                              </button>
                              <button
                                className="px-3 border-0 rounded-pill bg-usrb shadow-lg ml-1 py-1"
                                onMouseEnter={() => handleMouse(`${elem.id}2`)}
                                onMouseLeave={() => handleMouse("0")}
                                onClick={() => setModal(`${elem.id}2`)}
                              >
                                <i className="fa-solid text-white  fa-eye"></i>
                                <div
                                  className={
                                    mouse === `${elem.id}2`
                                      ? "tooltip tooltip-inner show"
                                      : "tooltip "
                                  }
                                >
                                  View
                                  {modal === `${elem.id}2` && (
                                    <PreviewModal
                                      modalHeader={ViewLabel}
                                      modal={modal === `${elem.id}2` && true}
                                      setModal={setModal}
                                    >
                                      {routeName === "civilmarriage" && (
                                        <MarriageView id={elem.id} />
                                      )}

                                      {routeName === "singlestatusletter" && (
                                        <SingleStatusView
                                          id={elem.id}
                                          setmodalClose={setModal}
                                        />
                                      )}
                                      {routeName === "churchlicensing" && (
                                        <LicensingAChurchView id={elem.id} />
                                      )}
                                      {routeName ===
                                        "lostcertificateretrieval" && (
                                        <RetrievalView id={elem.id} />
                                      )}
                                      {routeName === "LicenseRenewal" && (
                                        <LicenseRenewalView id={elem.id} />
                                      )}
                                    </PreviewModal>
                                  )}
                                </div>
                              </button>
                              <button
                                className="px-3 border-0 rounded-pill bg-usrb shadow-lg ml-1 py-1"
                                onMouseEnter={() => handleMouse(`${elem.id}3`)}
                                onMouseLeave={() => handleMouse("0")}
                                onClick={() => handleDelete(elem.id)}
                              >
                                <i className="fa-solid text-white fa-trash"></i>
                                <div
                                  className={
                                    mouse === `${elem.id}3`
                                      ? "tooltip tooltip-inner show"
                                      : "tooltip "
                                  }
                                >
                                  delete
                                </div>
                              </button>
                            </>
                          )}
                          {elem.status === "Approved" && (
                            <>
                              <button
                                className="px-3 border-0 rounded-pill bg-usrb shadow-lg ml-1 py-1"
                                onMouseEnter={() => handleMouse(`${elem.id}4`)}
                                onMouseLeave={() => handleMouse("0")}
                                onClick={() => setModal(`${elem.id}42`)}
                              >
                                <i className="fa-solid text-white  fa-file"></i>
                                <div
                                  className={
                                    mouse === `${elem.id}41`
                                      ? "tooltip tooltip-inner show"
                                      : "tooltip "
                                  }
                                >
                                  document view
                                </div>
                                <DocumentPreview
                                  modal={modal === `${elem.id}41` && true}
                                  setModal={setModal}
                                >
                                  {routeName === "lostcertificateretrieval" && (
                                    <embed
                                      src={URL.createObjectURL(
                                        elem.certificate
                                      )}
                                      className="w-100 h-100"
                                    />
                                  )}

                                  {routeName === "civilmarriage" && (
                                    <embed
                                      src={
                                        "data:application/pdf;base64," +
                                        getDocument
                                      }
                                      className="w-100 h-100"
                                    />
                                  )}
                                </DocumentPreview>
                                <MiniModal
                                  modal={modal === `${elem.id}42` && true}
                                  setModal={setModal}
                                  setOTP={setOTP}
                                >
                                  <Row className="justify-content-center ">
                                    {OTP.visible && (
                                      <TextInput
                                        id="otp"
                                        labelText="Enter Your OTP"
                                        value={OTP.otp}
                                        onChange={(e) =>
                                          setOTP({
                                            ...OTP,
                                            otp: e.target.value,
                                          })
                                        }
                                      />
                                    )}
                                  </Row>
                                  <Row className="justify-content-center align-items-center">
                                    {!OTP.visible ? (
                                      <Button
                                        className="px-3 border-0 rounded text-white  bg-usrb shadow-lg ml-1 py-1"
                                        onClick={() => {
                                          verification();
                                          setOTP((elem) => {
                                            return {
                                              ...elem,
                                              visible: true,
                                            };
                                          });
                                        }}
                                      >
                                        Recieve OTP
                                      </Button>
                                    ) : (
                                      <Button
                                        className="px-3 border-0 rounded text-white  bg-usrb shadow-lg ml-1 py-1"
                                        onClick={() => {
                                          if (!OTP.otp) {
                                            toast.error(
                                              `Please Enter Your OTP`,
                                              {
                                                theme: "colored",
                                                toastId: "error-toast",
                                              }
                                            );
                                          } else if (
                                            Number(OTP.otp) !== OTPNumber
                                          ) {
                                            toast.error(`Invalid OTP`, {
                                              theme: "colored",
                                              toastId: "error-toast",
                                            });
                                          } else {
                                            const docView = async () => {
                                              const fetchData = await fetch(
                                                `https://zoho-sign-fvn2.onrender.com/getdocument?id=${elem.reqID}`
                                              )
                                                .then((res) => res.json())
                                                .then((data) => data.pdf);
                                              setDocument(fetchData);
                                              setModal(`${elem.id}41`);
                                              setOTP({
                                                otp: "",
                                                visible: "",
                                              });
                                            };
                                            docView();
                                          }
                                        }}
                                      >
                                        Verify
                                      </Button>
                                    )}
                                  </Row>
                                  <Row>
                                    {!OTP.visible ? (
                                      <p className="font-weight-bold text-red mt-1">
                                        Note: The OTP will be sent to your
                                        email.
                                      </p>
                                    ) : (
                                      <p className="font-weight-bold text-red mt-1">
                                        Note : Check Your Mail For OTP.
                                      </p>
                                    )}
                                  </Row>
                                </MiniModal>
                              </button>

                              {routeName !== "lostcertificateretrieval" ? (
                                routeName === "civilmarriage" && (
                                  <>
                                    <Button
                                      className="px-3 border-0 rounded-pill bg-usrb shadow-lg ml-1 py-1"
                                      onMouseEnter={() =>
                                        handleMouse(`${elem.id}1`)
                                      }
                                      onMouseLeave={() => handleMouse("0")}
                                      onClick={() => {
                                        setModal(`${elem.id}5`);
                                      }}
                                    >
                                      <i className="fa-solid m-0 text-white fa-floppy-disk"></i>
                                      <div
                                        className={
                                          mouse === `${elem.id}1`
                                            ? "tooltip tooltip-inner show"
                                            : "tooltip "
                                        }
                                      >
                                        download
                                      </div>
                                    </Button>
                                    <MiniModal
                                      modal={modal === `${elem.id}5` && true}
                                      setModal={setModal}
                                      setOTP={setOTP}
                                    >
                                      <Row className="justify-content-center ">
                                        {OTP.visible && (
                                          <TextInput
                                            id="otp"
                                            labelText="Enter Your OTP"
                                            value={OTP.otp}
                                            onChange={(e) =>
                                              setOTP({
                                                ...OTP,
                                                otp: e.target.value,
                                              })
                                            }
                                          />
                                        )}
                                      </Row>
                                      <Row className="justify-content-center align-items-center">
                                        {!OTP.visible ? (
                                          <Button
                                            className="px-3 border-0 rounded text-white  bg-usrb shadow-lg ml-1 py-1"
                                            onClick={() => {
                                              verification();
                                              setOTP((elem) => {
                                                return {
                                                  ...elem,
                                                  visible: true,
                                                };
                                              });
                                            }}
                                          >
                                            Recieve OTP
                                          </Button>
                                        ) : (
                                          <Button
                                            className="px-3 border-0 rounded text-white  bg-usrb shadow-lg ml-1 py-1"
                                            onClick={() => {
                                              if (!OTP.otp) {
                                                toast.error(
                                                  `Please Enter Your OTP`,
                                                  {
                                                    theme: "colored",
                                                    toastId: "error-toast",
                                                  }
                                                );
                                              } else if (
                                                Number(OTP.otp) !== OTPNumber
                                              ) {
                                                toast.error(`Invalid OTP`, {
                                                  theme: "colored",
                                                  toastId: "error-toast",
                                                });
                                              } else {
                                                downloadDoc(elem.reqID);
                                                setModal(0);
                                                setOTP({
                                                  otp: "",
                                                  visible: "",
                                                });
                                              }
                                            }}
                                          >
                                            Verify
                                          </Button>
                                        )}
                                      </Row>
                                      <Row>
                                        {!OTP.visible ? (
                                          <p className="font-weight-bold text-red mt-1">
                                            Note: The OTP will be sent to your
                                            email.
                                          </p>
                                        ) : (
                                          <p className="font-weight-bold text-red mt-1">
                                            Note : Check Your Mail For OTP.
                                          </p>
                                        )}
                                      </Row>
                                    </MiniModal>
                                  </>
                                )
                              ) : (
                                <FileDownloader
                                  className="d-inline px-3 border-0 rounded-pill bg-usrb shadow-lg ml-1 py-1"
                                  onMouseEnter={() =>
                                    handleMouse(`${elem.id}5`)
                                  }
                                  onMouseLeave={() => handleMouse("0")}
                                  fileObj={elem.certificate}
                                >
                                  <i className="fa-solid  text-white fa-floppy-disk"></i>
                                  <div
                                    className={
                                      mouse === `${elem.id}5`
                                        ? "tooltip tooltip-inner show"
                                        : "tooltip "
                                    }
                                  >
                                    download
                                  </div>
                                </FileDownloader>
                              )}
                            </>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </Table>
          </Card>
        </div>
      </Row>
    </Container>
  );
}
