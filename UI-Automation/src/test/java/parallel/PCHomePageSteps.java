package parallel;

import com.pages.pcHomePage;
import com.qa.factory.DriverFactory;
import io.cucumber.datatable.DataTable;
import io.cucumber.java.en.And;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.junit.Assert;

import java.util.List;

public class PCHomePageSteps {

	private static String title;

	private pcHomePage pcHome=new pcHomePage(DriverFactory.getDriver());


	@When("user click on {string}")
	public void user_click_on(String linkName) {
		pcHome.clickTextLink(linkName);

	}

	@Given("the user is on the home page")
	public void the_user_is_on_the_home_page() {
		DriverFactory.getDriver()
				.get("http://localhost:4200/");
	}

	@Then("all the part should be displayed")
		public void productValidations(DataTable productTable) {
		List<String> expProductList =productTable.asList();
		List<String> actualProductList = pcHome.getProduct();
		System.out.println("Actual: "+actualProductList);
		System.out.println("Expected: "+expProductList);

		Assert.assertTrue(expProductList.containsAll(actualProductList));
		}

	@And("user select {string} and add it in cart")
	public  void addProductTOCart(String productName) throws InterruptedException {
	pcHome.addToCart(productName);
	}

	@And("Validate below product in cart")
	public void cartProductValidation(DataTable pList){
		List<String> expProductList=pList.asList();
		List<String> actProductList= pcHome.cartProduct();
		System.out.println("Actual: "+actProductList);
		System.out.println("Expected: "+expProductList);

		Assert.assertTrue(actProductList.containsAll(expProductList));
	}
}

