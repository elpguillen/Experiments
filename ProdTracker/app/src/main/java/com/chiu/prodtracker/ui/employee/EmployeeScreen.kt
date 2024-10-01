package com.chiu.prodtracker.ui.employee

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.Card
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.focus.focusModifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.chiu.prodtracker.ui.theme.ProdTrackerTheme

@Composable
fun EmployeeScreen(modifier: Modifier) {

}

@Composable
fun EmployeeList(employeeList: List<String>, onItemClick: (String) -> Unit, modifier: Modifier) {
    LazyColumn(modifier = modifier) {
        items(items = employeeList, key = {it}) { employee ->
            EmployeeItem(
                name = employee
            )
        }
    }
}

@Composable
fun EmployeeItem(name: String, modifier: Modifier = Modifier) {
    Card(onClick = { }, modifier = modifier) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(5.dp),
            horizontalArrangement = Arrangement.Center
        ) {
            Text(text = name)
        }
    }
}

@Preview(showBackground = true)
@Composable
fun EmployeeListPreview() {

    val employeeList: List<String> = listOf(
        "Elara Moonshadow",
        "Thaddeus Blackthorn",
        "Seraphina Starling",
        "Gideon Frost",
        "Lysandra Nightshade",
        "Alaric Stormrider",
        "Morgana Ravenswood",
        "Cedric Hawthorne",
        "Isolde Winterbourne",
        "Orion Ashwood",
        "Felicity Silverstream",
        "Percival Emberheart",
        "Rowena Thistledown",
        "Ignatius Thornfield",
        "Arabella Windwalker",
        "Cassius Darkwater",
        "Evangeline Brightspark",
        "Leopold Greystone",
        "Selene Moonwhisper",
        "Barnabas Ironwood"
    )

    ProdTrackerTheme {
        EmployeeList(employeeList = employeeList, onItemClick = {} , modifier = Modifier)
    }
}