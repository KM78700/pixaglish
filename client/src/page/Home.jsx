import React, { useEffect, useState } from 'react';

import { Card, FormField, Loader } from '../components';

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return data.map((post) => <Card key={post._id} {...post} />);
  }

  return (
    <h2 className="mt-5 font-bold text-[#6469ff] text-xl uppercase">
      {title}
    </h2>
  );
};

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);

  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState(null);

  const fetchPosts = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        'http://localhost:8080/api/v1/post',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        setAllPosts(result.data.reverse());
        console.log(result.data.reverse());
      }
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = allPosts.filter(
          (item) =>
            item.name
              .toLowerCase()
              .includes(searchText.toLowerCase()) ||
            item.prompt
              .toLowerCase()
              .includes(searchText.toLowerCase())
        );
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">
          Une communauté unique pour pratiquer l’anglais en ligne
        </h1>
        <p className="mt-2 text-[#666e75] text-[18px] max-w-[80%]">
          Vous cherchez à améliorer votre compréhension orale et votre
          expression écrite ? Ne manquez pas nos conférences en ligne{' '}
          <b
            style={{
              fontSize: '20px',
              backgroundColor: 'yellow',
              padding: '0px 4px',
            }}
          >
            GRATUITES
          </b>{' '}
          avec des locuteurs natifs, organisées plusieurs fois par
          semaine ! Les cours porteront sur la description d'images
          générées par l'IA la veille, vous permettant de découvrir
          des paysages magnifiques tout en perfectionnant vos
          compétences linguistiques. Restez à l'écoute pour plus
          d'informations sur les horaires et les instructions pour
          participer.
        </p>
      </div>

      <div className="mt-16">
        <FormField
          labelName="Rechercher des messages"
          type="text"
          name="text"
          placeholder="Chercher quelque chose..."
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>

      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="font-medium text-[#666e75] text-xl mb-3">
                Showing Resuls for{' '}
                <span className="text-[#222328]">{searchText}</span>:
              </h2>
            )}
            <div className="grid lg:grid-cols-3 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-2">
              {searchText ? (
                <RenderCards
                  data={searchedResults}
                  title="No Search Results Found"
                />
              ) : (
                <RenderCards data={allPosts} title="No Posts Yet" />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;
