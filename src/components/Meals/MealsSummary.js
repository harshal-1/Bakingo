import classes from './MealsSummary.module.css';

const MealsSummary = () => {
  return (
    <section className={classes.summary}>
      <h2 className='h'>Delicious Cakes, Delivered To You</h2>
      <p>
        Choose your favorite cake from our broad selection of available cakes
        and enjoy the delicious dessert at home.
      </p>
      <p>
        All our cakes are baked with high-quality ingredients, just-in-time and
        of course by experienced chefs!
      </p>
    </section>
  );
};

export default MealsSummary;
