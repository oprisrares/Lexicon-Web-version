import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #263238;
`;

const Iframe = styled.iframe`
  width: 80vw;
  height: 80vh;
  border: none;
  background: #fff;
  box-shadow: 0 2px 12px rgba(0,0,0,0.2);
`;

export default function PdfViewer() {
  const { id } = useParams();
  // For demo, use a public PDF. Replace with your own logic if needed.
  const pdfUrl = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
  return (
    <Container>
      <Iframe src={pdfUrl} title={`Book PDF ${id}`} />
      <BackButton />
    </Container>
  );
} 