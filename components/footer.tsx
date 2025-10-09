import Container from './container';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <Container>
        <div className="border-t border-border text-sm py-4 text-center text-muted-foreground">
          ©{year} 思宇 Ssuyu All Rights Reserved
        </div>
      </Container>
    </footer>
  );
}
