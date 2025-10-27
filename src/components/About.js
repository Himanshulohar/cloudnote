import React from 'react';

// About Component for the Cloud Note Project (CloudNote)
const About = () => {
  return (
    // Outer container using Bootstrap's background, padding, and min-height utilities
    <div className='bg-light min-vh-100 py-5'>
      <div className='container py-5'>
        <div className='row justify-content-center'>
          <div className='col-12 col-lg-8'>
            {/* Header Section */}
            <header className='text-center mb-5'>
              <h1 className='display-3 fw-bold text-dark'>
                {/* Using a star icon from Font Awesome */}
                <i className='fas fa-star text-warning me-2'></i>
                About CloudNote
              </h1>
              <p className='mt-3 fs-5 text-secondary'>
                Your secure and seamless digital note-taking companion in the
                cloud.
              </p>
            </header>

            {/* Core Value Proposition Card */}
            <div className='card shadow-lg rounded-4 mb-5 border-0 border-top border-4 border-primary'>
              <div className='card-body p-4 p-md-5'>
                <h2 className='card-title h3 fw-bold text-dark mb-4 d-flex align-items-center'>
                  {/* Using a cloud icon from Font Awesome */}
                  <i className='fas fa-cloud text-primary me-2'></i>
                  The Future of Note-Taking
                </h2>
                <p className='card-text text-secondary fs-5 lh-base text-justify'>
                  CloudNote is designed for the modern world. We eliminate the
                  friction of physical notebooks and local files, offering a
                  platform where your thoughts, ideas, and important data are
                  instantly synchronized across all your devices. Whether you’re
                  brainstorming a project, logging daily tasks, or recording
                  meeting minutes, your notes are always available, secure, and
                  ready for you, wherever life takes you.
                </p>
              </div>
            </div>

            {/* Feature Grid Section */}
            <section className='row row-cols-1 row-cols-md-3 g-4 text-center'>
              {/* Feature 1: Security */}
              <div className='col'>
                <div className='card h-100 p-4 shadow-sm rounded-3 border-0'>
                  <i className='fas fa-lock fa-3x mx-auto text-danger mb-4'></i>
                  <h3 className='h5 fw-semibold text-dark mb-2'>
                    Ironclad Security
                  </h3>
                  <p className='text-secondary'>
                    Your data privacy is our priority. We use industry-leading
                    encryption to keep your sensitive notes safe in the cloud.
                  </p>
                </div>
              </div>

              {/* Feature 2: Accessibility */}
              <div className='col'>
                <div className='card h-100 p-4 shadow-sm rounded-3 border-0'>
                  <i className='fas fa-users fa-3x mx-auto text-success mb-4'></i>
                  <h3 className='h5 fw-semibold text-dark mb-2'>
                    Universal Access
                  </h3>
                  <p className='text-secondary'>
                    Notes are accessible from any device, anywhere in the world.
                    Just log in and continue right where you left off.
                  </p>
                </div>
              </div>

              {/* Feature 3: Performance */}
              <div className='col'>
                <div className='card h-100 p-4 shadow-sm rounded-3 border-0'>
                  <i className='fas fa-bolt fa-3x mx-auto text-warning mb-4'></i>
                  <h3 className='h5 fw-semibold text-dark mb-2'>
                    Lightning Fast
                  </h3>
                  <p className='text-secondary'>
                    Built with modern technology for instantaneous saving,
                    retrieval, and editing of all your notes.
                  </p>
                </div>
              </div>
            </section>

            {/* Call to Action / Footer */}
            <footer className='mt-5 pt-4 border-top border-secondary-subtle text-center'>
              <p className='fs-5 text-secondary'>
                Ready to organize your life?
                <a
                  href='/signup'
                  className='fw-bold text-decoration-underline text-primary mx-1'
                >
                  Sign up
                </a>
                or
                <a
                  href='/login'
                  className='fw-bold text-decoration-underline text-primary mx-1'
                >
                  Log in
                </a>
                to start your effortless note-taking journey today!
              </p>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
