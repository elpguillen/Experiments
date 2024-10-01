package com.chiu.prodtracker.ui.employee

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material3.Card
import androidx.compose.material3.FloatingActionButton
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.chiu.prodtracker.ui.theme.ProdTrackerTheme

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

@Composable
fun EmployeeScreen(
    modifier: Modifier,
    navigateToEmployeeEntry: () -> Unit,
    ) {
    Scaffold(
        floatingActionButton = {
            FloatingActionButton(
                onClick = { },
                shape = MaterialTheme.shapes.medium,
                modifier = Modifier.padding(24.dp)
            ) {
                Icon(
                    imageVector = Icons.Default.Add,
                    contentDescription = "Add Employee"
                )
            }
        }
    ) {
        innerPadding ->
        EmployeeBody(
            employees = employeeList,
            onItemClick = {},
            modifier = Modifier
                .padding(innerPadding)
                .fillMaxSize()
        )
    }
}

@Composable
fun EmployeeBody(
    employees: List<String>,
    onItemClick: (String) -> Unit,
    modifier: Modifier
) {
    Column(
        horizontalAlignment = Alignment.CenterHorizontally,
        modifier = modifier
            .padding(top = 16.dp)
    ) {
        EmployeeList(
            employeeList = employees,
            onItemClick = {},
            modifier = modifier
        )
    }
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
fun EmployeeScreenPreview() {
    ProdTrackerTheme {
        EmployeeScreen(modifier = Modifier) {
            
        }
    }
}

/*@Preview(showBackground = true)
@Composable
fun EmployeeListPreview() {
    ProdTrackerTheme {
        EmployeeList(employeeList = employeeList, onItemClick = {} , modifier = Modifier)
    }
}*/